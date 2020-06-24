#ls -a ../data/numbers_v2 > data.lx

if [ $# -ne 1 ]; then
	echo "No arguments supplied"
	exit
fi

DIR="$1/"
FILES="$DIR*"

echo $0

echo "let fileList = [" > ./dataLister/data.js
for f in $FILES
do
	line="\t\"$f\","
	echo -e $line | sed "s|$DIR||g" >> ./dataLister/data.js
done

echo "]" >> ./dataLister/data.js
echo -e "\nconst PATH = \"$DIR\";" >> ./dataLister/data.js