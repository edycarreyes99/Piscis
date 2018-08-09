<?php
header('Access-Control-Allow-Origin: *');
define('Private_Key', '5f29645be75280493a5d');
$tempPath = $_FILES['file']['tmp_name'];
$actualName = $_FILES['file']['name'];
$actualPath = dirname(__FILE__)."\\temp\\".$actualName;
move_uploaded_file($tempPath, $actualPath);
$ch = curl_init();
$post = [
	'UPLOADCARE_PUB_KEY'=>Private_Key,
	'UPLOADCARE_STORE'=>1,
	'file'=> curl_file_create($actualPath)
];
curl_setopt($ch, CURLOPT_URL, 'https://upload.uploadcare.com/base/');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
$response = curl_exec($ch);
echo ($response);