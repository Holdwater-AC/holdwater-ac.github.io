#!/usr/bin/env fish

set opening $OPENING
set tmp (mktemp)

curl -s $ENDPOINT -X POST -H 'Content-Type: application/json' --data-raw $PARAMS | jq -r '
  .[3][1].pnlHistory | 
  
  (map(select(.[0] >= '$opening')) | .[0][1] | tonumber) as $baseline |
  
  map(select(.[0] >= '$opening')) |
  map({
    "timestamp": .[0],
    "date": (.[0] / 1000 | strftime("%Y-%m-%d")),
    "pnl": (.[1] | tonumber),
    "percentage": (if $baseline != 0 then 
                    ((.[1] | tonumber) - $baseline) / ($baseline | fabs) * 100
                  else 
                    if (.[1] | tonumber) > 0 then 100 
                    else if (.[1] | tonumber) < 0 then -100 
                    else 0 end 
                    end
                  end)
  }) |
  
  ["Date,PnL,Percentage Change"], 
  (map([.date, (.pnl | tostring), (.percentage | tostring + "%")]) | map(join(","))), 
  [""], 
  ["Total change from " + .[0].date + " to " + .[-1].date + ": " + (.[-1].percentage | tostring + "%")]
  | join("\n")
' >"$tmp"

if test (cat "$tmp" | wc -l) -lt 3
    echo "Error: Failed to fetch or process data. Check the URL and try again."
    rm "$tmp"
    exit 1
end

set baseline (grep -m1 "," "$tmp" | cut -d',' -f2)
set latest (tail -n3 "$tmp" | head -n1 | cut -d',' -f2)
set change (tail -n1 "$tmp" | cut -d':' -f2 | string trim)
set timestamp (date +%Y-%m-%d)
set change_int (string replace -r '%$' '' $change)
echo "$change_int" >position.html

read -P "microblog entry: " -t 6000 micro
set latest "<p><span class='timestamp'>$timestamp</span> $micro</p>\n"
echo -e "$latest $(cat micro.html)" >micro.html

rm "$tmp"
