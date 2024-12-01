<?php
$host = 'localhost';
$username = 'lab5_user';
$password = 'password123';
$dbname = 'world';

header("Access-Control-Allow-Origin: *");


try {
    // Create a new PDO instance
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Check if the 'country' GET parameter is set
    if (isset($_GET['country'])) {
        
        $country = ($_GET['country']);
        
        $country = "%" . $country . "%";
        $stmt = $conn->prepare("SELECT * FROM countries WHERE name LIKE :country");
        $stmt->bindParam(':country', $country);
        $stmt->execute();
        
        // Fetch the results
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } else {
        // If no country is specified, fetch all countries
        $stmt = $conn->query("SELECT * FROM countries");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>

<?php if (!empty($results)): ?>
<table border="1">
    <thead>
        <tr>
            <th>Country Name</th>
            <th>Continent</th>
            <th>Independence Year</th>
            <th>Head of State</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($results as $row): ?>
        <tr>
            <td><?= htmlspecialchars($row['name']); ?></td>
            <td><?= htmlspecialchars($row['continent']); ?></td>
            <td><?= htmlspecialchars($row['independence_year']); ?></td>
            <td><?= htmlspecialchars($row['head_of_state']); ?></td>
        </tr>
        <?php endforeach; ?>
    </tbody>
</table>
<?php else: ?>
<p>No results found.</p>
<?php endif; ?>
