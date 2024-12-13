
import { addCSS } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

import Cookies from "https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.mjs";

export default function Profile() {
  async function fetchUserProfile() {
    const endpoint = "https://asia-southeast2-awangga.cloudfunctions.net/itungin/data/user";

    try {
      // Ambil token dari cookies
      const token = Cookies.get("login");
      console.log("Token retrieved:", token);

      if (!token) {
        throw new Error("Token is missing in cookies!");
      }

      // Fetch data dari API
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Login: token,
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response data:", result);

      // Cek apakah status sukses
      if (result.response && result.response.status === "Success") {
        const { name, email, phonenumber } = result.data;

        // Update elemen DOM
        document.querySelector("#name").textContent = name;
        document.querySelector("#email").textContent = email;
        document.querySelector("#phonenumber").textContent = phonenumber;

        console.log("Profile updated successfully!");
      } else {
        console.error("Failed to fetch profile:", result.response.info);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  }
  fetchUserProfile();
}