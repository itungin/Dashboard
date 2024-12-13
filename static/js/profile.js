
import { addCSS } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

import Cookies from "https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.mjs";

async function fetchUserProfile() {
    const endpoint = "https://asia-southeast2-awangga.cloudfunctions.net/itungin/data/user";

    try {
        const token = Cookies.get("login");
        if (!token) {
            console.error("Token tidak ditemukan!");
            alert("Token tidak ditemukan. Silakan login ulang.");
            return;
        }

        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Login: token,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Response data:", result);

        if (result && result.name && result.email && result.phonenumber) {
            const { name, email, phonenumber } = result;

            document.querySelector("#name").textContent = name;
            document.querySelector("#phonenumber").textContent = phonenumber;
            document.querySelector("#email").textContent = email;

            document.querySelector(".profile-info").style.display = "block";
            document.querySelector("#loading").style.display = "none";
        } else {
            console.error("Data tidak sesuai:", result);
            alert("Gagal memuat data profil.");
        }
    } catch (error) {
        console.error("Error fetching user profile:", error.message);
        alert("Terjadi kesalahan saat memuat profil. Silakan coba lagi.");
    }
}

fetchUserProfile();
