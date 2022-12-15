import React from 'react';

export default function Footer(){
    const yearD = new Date().getFullYear();
    return(
        <footer class="bg-warning w-100 text-center position-absolute bottom-0">
            <p>LingoDev ⓒ {yearD}</p>
        </footer>    
    )
}