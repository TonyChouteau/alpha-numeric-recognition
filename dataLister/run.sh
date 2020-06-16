#ls -a ../data/numbers_v2 > data.lx
DIR="./data/numbers_v2/"
FILES="$DIR*"

echo $0

echo "export let fileList = [" > ./dataLister/data.js
for f in $FILES
do
  line="\t\"$f\","
  echo -e $line | sed "s|$DIR||g" >> ./dataLister/data.js
done

echo "]" >> ./dataLister/data.js