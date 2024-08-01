// src/components/Header.js
import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Fuse from "fuse.js";
import Box from "@mui/material/Box";
import logo from "../images/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import { Login } from "@mui/icons-material";

function Header() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [navSelection, setNavSelection] = useState(null);

  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  function handleDropDown(selection) {
    if (navSelection === null) setNavSelection(selection);
    else if (navSelection === selection) setNavSelection(null);
    else setNavSelection(selection);
  }

  useEffect(() => {
    fetchData();
  }, []);
  console.log(navSelection);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://products2-tt3o.onrender.com/api/products`
      );
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    }
  };

  const handleChange = (value) => {
    setQuery(value);
    if (value.trim() === "") {
      setFilteredProducts([]);
    } else {
      const fuse = new Fuse(products, {
        keys: ["title", "description"],
        includeScore: true,
        threshold: 0.4,
      });
      const results = fuse.search(value);
      const matches = results.map((result) => result.item);
      setFilteredProducts(matches);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const fuse = new Fuse(products, {
      keys: ["title", "description"],
      includeScore: true,
      threshold: 0.4,
    });
    const results = fuse.search(query);
    const matches = results.map((result) => result.item);
    navigate("/search-results", { state: { results: matches } });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  // Determine screen width
  const screenWidth = window.innerWidth;

  return (
    <header>
      <Box
        sx={{
          height: { xs: "256px", sm: "136px" },
          width: "100vw",
        }}
      >
        <Box
          sx={{
            backgroundColor: "black",
            height: "38px",
            width: "100%",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: {
              xs: "5px",
              sm: "14px",
            },
          }}
        >
          <p className="sign-up-text">
            Sign up and get 20% off to your first order.
          </p>{" "}
          <button className="sign-up">Sign Up Now</button>
        </Box>
        <Box
          sx={{
            display: { sm: "flex" },
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: { sm: "12px" },
            marginRight: { sm: "60px" },
          }}
        >
          <Box display={{ xs: "none", sm: "block" }}>
            <Link to="/">
              <img className="logo" src={logo} alt="unlock discounts logo" />
            </Link>
          </Box>
          <Box
            display={{ xs: "flex", sm: "none" }}
            sx={{ justifyContent: "center" }}
          >
            <h2 className="mobile">UnlockDiscounts</h2>
          </Box>
          <Box
            className="nav-links"
            sx={{
              fontSize: { xs: "5px", sm: "20px" },
              display: "flex",
              gap: { xs: "8px", sm: "35px" },
              fontWeight: { xs: "500", sm: "600" },
              justifyContent: "center",
            }}
          >
            <span className="men-fashion-container">
              <Link onClick={() => handleDropDown("men")}>MEN</Link>
              {!navSelection || (
                <Box
                  display={{ xs: "none", sm: "flex" }}
                  sx={{
                    position: "absolute",
                    top: "50px",
                    backgroundColor: "#e2e8f0",

                    zIndex: "9999",
                    width: "1300px",
                    height: "500px",
                    padding: "20px 40px",
                    borderRadius: "6px",
                    fontSize: "18px",
                    fontWeight: 300,
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: { sm: "flex" },
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Link className="red-heading">T-Shirts</Link>
                    <Link>Casual Shirts</Link>
                    <Link>Formal Shirts</Link>
                    <Link>Sweatshirts</Link>
                    <Link>Sweaters</Link>
                    <Link>Jackets</Link>
                    <Link>Blazers & Coats</Link>
                    <Link>Suits</Link>
                    <Link>Rain Jackets</Link>
                    <Link className="red-heading">Indian & Festive Wear</Link>
                    <Link>Kurtas & Kurta Sets</Link>
                    <Link>Sherwanis</Link>
                    <Link>Nehru Jackets</Link>
                    <Link>Dhotis</Link>
                  </Box>
                  <Box
                    sx={{
                      display: { sm: "flex" },
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Link className="red-heading">Bottomwear</Link>
                    <Link>Jeans</Link>
                    <Link>Casual Trousers</Link>
                    <Link>Formal Trousers</Link>
                    <Link>Shorts</Link>
                    <Link>Track Pants & Joggers</Link>
                    <Link className="red-heading">Innerwear & Sleepwear</Link>
                    <Link>Briefs & Trunks</Link>
                    <Link>Boxers</Link>
                    <Link>Vests</Link>
                    <Link>leepwear & Loungewear</Link>
                    <Link>Thermals</Link>
                    <Link className="red-heading">Plus Size</Link>
                  </Box>
                  <Box
                    sx={{
                      display: { sm: "flex" },
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Link className="red-heading">Footwear</Link>
                    <Link>Casual Shoes</Link>
                    <Link>Sports Shoes</Link>
                    <Link>Sneakers</Link>
                    <Link>Sandals & Floaters</Link>
                    <Link>Flip Flops</Link>
                    <Link>Socks</Link>
                    <Link className="red-heading">
                      Personal Care & Grooming
                    </Link>
                    <Link className="red-heading">Sunglasses & Frames</Link>
                    <Link className="red-heading">Watches</Link>
                  </Box>
                  <Box
                    sx={{
                      display: { sm: "flex" },
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Link className="red-heading">Sports & Active Wear</Link>
                    <Link>Sports Shoes</Link>
                    <Link>Sports Sandals</Link>
                    <Link>Active T-Shirts</Link>
                    <Link>Track Pants & Shorts</Link>
                    <Link>Tracksuits</Link>
                    <Link>Jackets & Sweatshirts</Link>
                    <Link>Sports Accessories</Link>
                    <Link>Swimwear</Link>
                    <Link className="red-heading">Gadgets</Link>
                    <Link>Smart Wearables</Link>
                    <Link>Fitness Gadgets</Link>
                    <Link>Headphones</Link>
                    <Link>Speakers</Link>
                  </Box>
                  <Box
                    sx={{
                      display: { sm: "flex" },
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Link className="red-heading">Fashion Accessories</Link>
                    <Link>Wallets</Link>
                    <Link>Belts</Link>
                    <Link>Perfumes & Body Mists</Link>
                    <Link>Trimmers</Link>
                    <Link>Deodorants</Link>
                    <Link>Ties</Link>
                    <Link>Cufflinks & Pocket Squares</Link>
                    <Link>Accessory Gift Sets</Link>
                    <Link>Caps & Hats</Link>
                    <Link>Mufflers, Scarves & Gloves</Link>
                    <Link>Phone Cases</Link>
                    <Link>Rings & Wristwear</Link>
                    <Link>Helmets</Link>
                    <Link className="red-heading">Bags & Backpacks</Link>
                    <Link className="red-heading">Luggages & Trolleys</Link>
                  </Box>
                </Box>
              )}
            </span>
            <Link onClick={() => handleDropDown("women")}>WOMEN</Link>
            <Link onClick={() => handleDropDown("kids")}>KIDS</Link>
            <Link onClick={() => handleDropDown("home&living")}>
              HOME & LIVING
            </Link>
            <Link onClick={() => handleDropDown("beauty")}>BEAUTY</Link>
            <Link to="/">ONLINE LEARNING</Link>
          </Box>
          <Box
            className="search-bar"
            sx={{
              width: { sm: "377px" },
              height: { sm: "48px" },
              borderRadius: "50px",
              backgroundColor: "#F0F0F0",
            }}
          >
            <form onSubmit={handleSearch} className="form">
              <SearchIcon />
              <input
                className="input-box"
                type="text"
                name="search-input"
                placeholder="Looking For Something..."
                value={query}
                onChange={(e) => handleChange(e.target.value)}
                onKeyPress={handleKeyPress} // Handle Enter key press
                autoComplete="off"
              />
            </form>
          </Box>
        </Box>
      </Box>
    </header>
  );
}

export default Header;
