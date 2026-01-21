cd "/Users/michaelpaulukonis/projects/p5mirror-MichaelPaulukonis/downloads/../p5projects"
#
echo unzip 1 "bodyPose-skeleton copy-Em_8gOqxd"
rm -rf "./bodyPose-skeleton copy-Em_8gOqxd"
mkdir "./bodyPose-skeleton copy-Em_8gOqxd"
pushd "./bodyPose-skeleton copy-Em_8gOqxd" > /dev/null
unzip -q "../../downloads/zips/bodyPose-skeleton copy-Em_8gOqxd"
popd > /dev/null
#
echo unzip 2 "shapes random innerCount v25 copy-HxcFUW3jN"
rm -rf "./shapes random innerCount v25 copy-HxcFUW3jN"
mkdir "./shapes random innerCount v25 copy-HxcFUW3jN"
pushd "./shapes random innerCount v25 copy-HxcFUW3jN" > /dev/null
unzip -q "../../downloads/zips/shapes random innerCount v25 copy-HxcFUW3jN"
popd > /dev/null
#
echo unzip 3 "Transience omi v2-tnZBaj1rs"
rm -rf "./Transience omi v2-tnZBaj1rs"
mkdir "./Transience omi v2-tnZBaj1rs"
pushd "./Transience omi v2-tnZBaj1rs" > /dev/null
unzip -q "../../downloads/zips/Transience omi v2-tnZBaj1rs"
popd > /dev/null
#
echo unzip 4 "ims black-n white-1 bounce copy-yeNilEnD4"
rm -rf "./ims black-n white-1 bounce copy-yeNilEnD4"
mkdir "./ims black-n white-1 bounce copy-yeNilEnD4"
pushd "./ims black-n white-1 bounce copy-yeNilEnD4" > /dev/null
unzip -q "../../downloads/zips/ims black-n white-1 bounce copy-yeNilEnD4"
popd > /dev/null

cd ..
# remove redundant p5.js p5.sound.min.js ml5.min.js
rm -f p5projects/*/p5.* p5projects/*/ml5.min.js
# sync last_updatedAt.txt
cd downloads/json
if [ -e pending_updatedAt.txt ]; then
  rm -f last_updatedAt.txt
  mv pending_updatedAt.txt last_updatedAt.txt
fi