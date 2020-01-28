#!/usr/bin/env bash

BUCKET="bucket/path"
export AWS_PROFILE="myprofile"

# HTML
aws s3 cp ../../frontend/index.html s3://${BUCKET}/index.html --acl public-read
aws s3 cp ../../frontend/success.html s3://${BUCKET}/success.html --acl public-read

## CSS
aws s3 cp ../../frontend/css s3://${BUCKET}/css --exclude ".DS_Store" --recursive --acl public-read

## JS
aws s3 cp ../../frontend/js s3://${BUCKET}/js --exclude ".DS_Store" --recursive --acl public-read

### Images
aws s3 cp ../../frontend/img s3://${BUCKET}/images --exclude ".DS_Store" --recursive --acl public-read
#
### Vendor
aws s3 cp ../../frontend/vendor/jquery/jquery.min.js s3://${BUCKET}/vendor/jquery/jquery.min.js --acl public-read
aws s3 cp ../../frontend/vendor/bootstrap/js/bootstrap.bundle.min.js s3://${BUCKET}/vendor/bootstrap/js/bootstrap.bundle.min.js --acl public-read
aws s3 cp ../../frontend/vendor/jquery-easing/jquery.easing.min.js s3://${BUCKET}/vendor/jquery-easing/jquery.easing.min.js --acl public-read
aws s3 cp ../../frontend/vendor/fontawesome-free/css/all.min.css s3://${BUCKET}/vendor/fontawesome-free/css/all.min.css --acl public-read

echo "Frontend deployed to AWS"
