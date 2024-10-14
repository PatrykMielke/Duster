<?php
// Function to calculate the last activity date based on a timestamp
    function getLastActivity($secondsSinceEpoch) {
        // Convert the seconds to a human-readable date format (Y-m-d H:i:s)
        return date('H:i:s d.m.Y ', $secondsSinceEpoch);
    }

    // Example usage: passing seconds since January 1st, 1970
    $timestamp = 1728759895; // Example timestamp
    echo "User's last activity: " . getLastActivity($timestamp);
