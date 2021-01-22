<?php
        require_once('CsvImport/CsvImporter.php');
	$process = $argv[1];

	if($process == 1){
        	$data_path = "RewardsLevel";
        	$clientNumber;
        	$rewardLevel;
        	$yearlyPoints;
        	$quarterlyPoints;

        	if(!$data_path) exit;
	
        	$importer = new CsvImporter($data_path,false);
        	$data = $importer->get();
        
		$logFile =  fopen('rewardsLevels.JSON', 'w+');
		foreach ($data as $row) {
                        $clientNumber = $row[0];
                        $rewardLevel = $row[1];
                        $yearlyPoints = $row[3];
                        $quarterlyPoints = $row[4];
                        if(!isset($quarterlyPoints)) $quarterlyPoints = 0;
        

        		$dataSet = array(
                    		"soldto" => $clientNumber,
                    		"level" => $rewardLevel,
                    		"yearlyPoints" => $yearlyPoints,
                    		"quarterlyPoints" => $quarterlyPoints,
                	);

        		$json_data = stripslashes(json_encode($dataSet));
        		fwrite($logFile, "\n" . $json_data . "\n") or die("Cannot write to file");
    		}
		fclose($logFile);
        }

	if($process == 2){
        	$data_path = "rewardsCoupons.csv";
        	$clientNumber;
        	$email;
        	$couponCode;
        	$codeAmount;

        	if(!$data_path) exit;
	
        	$importer = new CsvImporter($data_path, true, ",");
        	$data = $importer->get();
        
		$logFile =  fopen('rewardsCoupons.JSON', 'w+');
		foreach ($data as $row) {
                        $clientNumber = $row['Sold-to party'];
			$clientNumber = str_pad($clientNumber, 10, '0', STR_PAD_LEFT);
                        $email= $row['Customer Email Addre'];
                        $couponCode= $row['Coupon'];
                        $codeAmount= $row['Amount'];
                        
        

        		$dataSet = array(
                    	"soldto" => $clientNumber,
                    	"email" => $email,
                    	"couponCode" => strtoupper($couponCode),
                    	"codeAmount" => $codeAmount,
                	);

        		$json_data = stripslashes(json_encode($dataSet));
        		fwrite($logFile, "\n" . $json_data . "\n") or die("Cannot write to file");

    		}
		fclose($logFile);
        }
/*
	if($process == 3){
        	$data_path = "couponThankYou.csv";
        	$clientNumber;
        	$codeAmount;
		$expiration;

        	if(!$data_path) exit;
	
        	$importer = new CsvImporter($data_path, true, ",");
        	$data = $importer->get();
        
		$logFile =  fopen('couponThankYou.JSON', 'w+');
		foreach ($data as $row) {
                        $clientNumber = $row['Sold-to party'];
			$clientNumber = str_pad($clientNumber, 10, '0', STR_PAD_LEFT);
                        $codeAmount= $row['Amount'];
			$expiration = $row['Valid to'];
                        
        

        		$dataSet = array(
                    	"soldto" => $clientNumber,
                    	"codeAmount" => $codeAmount,
			"validto" => $expiration
                	);

        		$json_data = stripslashes(json_encode($dataSet));
        		fwrite($logFile, "\n" . $json_data . "\n") or die("Cannot write to file");

    		}
		fclose($logFile);
        }*/

	if($process == 4){
        	$data_path = "couponWeMissYou.csv";
        	$clientNumber;
        	$codeAmount;
		$expiration;

        	if(!$data_path) exit;
	
        	$importer = new CsvImporter($data_path, true, ",");
        	$data = $importer->get();
        
		$logFile =  fopen('couponWeMissYou.JSON', 'w+');
		foreach ($data as $row) {
                        $clientNumber = $row['Sold-to party'];
			$clientNumber = str_pad($clientNumber, 10, '0', STR_PAD_LEFT);
                        $codeAmount= $row['Amount'];
                        
        

        		$dataSet = array(
                    	"soldto" => $clientNumber,
                    	"codeAmount" => $codeAmount
                	);

        		$json_data = stripslashes(json_encode($dataSet));
        		fwrite($logFile, "\n" . $json_data . "\n") or die("Cannot write to file");

    		}
		fclose($logFile);
        }
/*
	function convertLevel($level){
		$new_number = 0;
		switch ($level) {
    		case "N0":
            case "NA":
        		$new_number = 'N0';  //basic or r
        		break;
    		case "N1":
            case "NB":
        		$new_number = 'N2'; //silver
        		break;
    		case "N2":
            case "NC":
        		$new_number = 'N3'; //gold 
        		break;
			case "N3":
            case "ND":
				$new_number = 'N4'; //platinum
				break;
			case "N4":
            case "NE":
				$new_number = 'N5'; //black
				break;

    		default:
				$new_number = $level;
        		break;
		}
		return $new_number;
	}*/
	
    
?>
