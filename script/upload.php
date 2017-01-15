<?php
header('content-type: application/json');
$h = getallheaders();
// Création d'objet JSON
$json_ob = new stdClass(); // Manière de déclarer un objet vide
$source = file_get_contents('php://input');

// Tableau des formats accepter par le plugin
$types = array('image/png', 'image/gif', 'image/jpeg');
if(!in_array($h['x-file-type'], $types)) {
    $json_ob->error = 'Format non supporté par le plugin';
} else {
    file_put_contents('../assets/imgs/' . $h['x-file-name'], $source);
    // Si l'uplaod c'est bien passé je renvoie des infos au JS
    $json_ob->name = $h['x-file-name']; // En cas de sauvegarde en BDD
    $json_ob->content = '<img src="assets/imgs/' . $h['x-file-name'] . '"/>';
}

echo json_encode($json_ob);


?>
