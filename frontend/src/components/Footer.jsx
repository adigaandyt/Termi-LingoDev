import React from 'react';
import "../styles/Header.css"

export default function Footer(){
    const yearD = new Date().getFullYear();
    return(
        <footer class="bg-warning text-secondary">
            <p>LingoDev ⓒ {yearD}</p>
        </footer>    
    )
}