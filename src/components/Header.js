// src/components/Header.js
import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Fuse from "fuse.js";
import Box from "@mui/material/Box";
import logo from "../images/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import offerBanner from "../images/50-off.png";
import MobileNavLink from "./MobileNavLink";
function Header() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [navSelection, setNavSelection] = useState(null);
  const [hamburger, setHamburger] = useState(false);
  const [mainFashionDropdown, setMainFashionDropdown] = useState(null);
  const [subFashionDropdown, setSubFashionDropdown] = useState(null);

  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  function handleDropDown(selection) {
    setNavSelection(selection);
  }
  function handleMainFashionDropdown(selection) {
    mainFashionDropdown === selection
      ? setMainFashionDropdown(null)
      : setMainFashionDropdown(selection);
  }
  function handleSubFashionDropdown(selection) {
    subFashionDropdown === selection
      ? setSubFashionDropdown(null)
      : setSubFashionDropdown(selection);
  }
  function handleCloseButton() {
    setHamburger(false);
    setMainFashionDropdown(null);
    setSubFashionDropdown(null);
  }
  const dropDownContainerStyles = {
    position: "absolute",
    top: "90px",
    left: "150px",
    backgroundColor: "#ffffff",

    zIndex: "9999",
    width: "1300px",
    height: "530px",
    padding: "20px 40px",
    borderRadius: "6px",
    fontSize: "18px",
    fontWeight: 300,
    justifyContent: "space-between",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  };
  useEffect(() => {
    fetchData();
  }, []);
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
          height: { xs: "60px", sm: "136px" },
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
              xs: "10px",
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: { xs: "5px", sm: "12px" },
            marginRight: { xs: "5px", sm: "60px" },
            marginTop: { xs: "10px", sm: "0" },
            position: "relative",
          }}
        >
          {/* mobile hamburger menu */}
          {hamburger && (
            <Box
              display={{ xs: "flex", sm: "none" }}
              sx={{
                width: "80%",
                height: "200vh",
                backgroundColor: "white",
                position: "absolute",
                top: "-10px",
                left: "-5px",
                zIndex: "9999",
                flexDirection: "column",
                gap: "20px",
                paddingBottom: "20px",
              }}
            >
              <Box sx={{ display: "flex", position: "relative" }}>
                <img
                  className="mobile-offer-banner"
                  src={offerBanner}
                  alt="offer banner"
                />
                <CloseIcon
                  onClick={handleCloseButton}
                  className="hamburger-closing-button"
                />
              </Box>
              <Box sx={{ marginLeft: "10px" }}>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Link
                    className="mobile-main-link"
                    onClick={handleCloseButton}
                  >
                    MEN
                  </Link>
                  <span
                    className="mobile-dropdown-logo-container"
                    onClick={() => handleMainFashionDropdown("men")}
                  >
                    {mainFashionDropdown === "men" ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowRightIcon />
                    )}
                  </span>
                </Box>
                {mainFashionDropdown === "men" && (
                  <>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          T-Shirts
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("men-tshirts")
                          }
                        >
                          {subFashionDropdown === "men-tshirts" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "men-tshirts" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child " to="/">
                            Casual Shirts
                          </Link>
                          <Link className="mobile-sub-link-child " to="/">
                            Formal Shirts
                          </Link>
                          <Link className="mobile-sub-link-child " to="/">
                            Sweatshirts
                          </Link>
                          <Link className="mobile-sub-link-child " to="/">
                            Sweaters
                          </Link>
                          <Link className="mobile-sub-link-child " to="/">
                            Jackets
                          </Link>
                          <Link className="mobile-sub-link-child " to="/">
                            Blazers & Coats
                          </Link>
                          <Link className="mobile-sub-link-child " to="/">
                            Suits
                          </Link>
                          <Link className="mobile-sub-link-child " to="/">
                            Rain Jackets
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Indian & Festive Wear
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("men-indian-festival")
                          }
                        >
                          {subFashionDropdown === "men-indian-festival" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "men-indian-festival" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Kurtas & Kurta Sets
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Sherwanis
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Nehru Jackets
                          </Link>
                          <Link className="mobile-sub-link-child ">Dhotis</Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Bottomwear
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("men-bottomwear")
                          }
                        >
                          {subFashionDropdown === "men-bottomwear" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "men-bottomwear" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">Jeans</Link>
                          <Link className="mobile-sub-link-child ">
                            Casual Trousers
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Formal Trousers
                          </Link>
                          <Link className="mobile-sub-link-child ">Shorts</Link>
                          <Link className="mobile-sub-link-child ">
                            Track Pants & Joggers
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Innerwear & Sleepwear
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("men-innerwear")
                          }
                        >
                          {subFashionDropdown === "men-innerwear" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "men-innerwear" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Briefs & Trunks
                          </Link>
                          <Link className="mobile-sub-link-child ">Boxers</Link>
                          <Link className="mobile-sub-link-child ">Vests</Link>
                          <Link className="mobile-sub-link-child ">
                            leepwear & Loungewear
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Thermals
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Plus Size
                      </Link>
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Footwear
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("men-Footwear")
                          }
                        >
                          {subFashionDropdown === "men-Footwear" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "men-Footwear" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Casual Shoes
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Sports Shoes
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Sneakers
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Sandals & Floaters
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Flip Flops
                          </Link>
                          <Link className="mobile-sub-link-child ">Socks</Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Personal Care & Grooming
                      </Link>
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Sunglasses & Frames
                      </Link>
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Watches
                      </Link>
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Sports & Active Wear
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() => handleSubFashionDropdown("men-sports")}
                        >
                          {subFashionDropdown === "men-sports" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "men-sports" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Sports Shoes
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Sports Sandals
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Active T-Shirts
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Track Pants & Shorts
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Tracksuits
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Jackets & Sweatshirts
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Sports Accessories
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Swimwear
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Gadgets
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("men-Gadgets")
                          }
                        >
                          {subFashionDropdown === "men-Gadgets" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "men-Gadgets" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Smart Wearables
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Fitness Gadgets
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Headphones
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Speakers
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Fashion Accessories
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("men-Fashion-Accessories")
                          }
                        >
                          {subFashionDropdown === "men-Fashion-Accessories" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "men-Fashion-Accessories" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Wallets
                          </Link>
                          <Link className="mobile-sub-link-child ">Belts</Link>
                          <Link className="mobile-sub-link-child ">
                            Perfumes & Body Mists
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Trimmers
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Deodorants
                          </Link>
                          <Link className="mobile-sub-link-child ">Ties</Link>
                          <Link className="mobile-sub-link-child ">
                            Cufflinks & Pocket Squares
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Accessory Gift Sets
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Caps & Hats
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Mufflers, Scarves & Gloves
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Phone Cases
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Rings & Wristwear
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Helmets
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Bags & Backpacks
                      </Link>
                    </Box>{" "}
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Luggages & Trolleys
                      </Link>
                    </Box>
                  </>
                )}
              </Box>
              <Box sx={{ marginLeft: "10px" }}>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Link
                    className="mobile-main-link"
                    onClick={handleCloseButton}
                  >
                    WOMEN
                  </Link>
                  <span
                    className="mobile-dropdown-logo-container"
                    onClick={() => handleMainFashionDropdown("women")}
                  >
                    {mainFashionDropdown === "women" ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowRightIcon />
                    )}
                  </span>
                </Box>
                {mainFashionDropdown === "women" && (
                  <>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Indian & Fusion Wear
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("women-indian-fusion-wear")
                          }
                        >
                          {subFashionDropdown === "women-indian-fusion-wear" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "women-indian-fusion-wear" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Kurtas & Suits
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Kurtis, Tunics & Tops
                          </Link>
                          <Link className="mobile-sub-link-child ">Sarees</Link>
                          <Link className="mobile-sub-link-child ">
                            Ethnic Wear
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Leggings, Salwars & Churidars
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Skirts & Palazzos
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Dress Materials
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Lehenga Cholis
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Dupattas & Shawls
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Jackets
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Belts, Scarves & More
                      </Link>
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Watches & Wearables
                      </Link>
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Western Wear
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("women-Western Wear")
                          }
                        >
                          {subFashionDropdown === "women-Western Wear" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "women-Western Wear" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Dresses
                          </Link>
                          <Link className="mobile-sub-link-child ">Tops</Link>
                          <Link className="mobile-sub-link-child ">
                            Tshirts
                          </Link>
                          <Link className="mobile-sub-link-child ">Jeans</Link>
                          <Link className="mobile-sub-link-child ">
                            Trousers & Capris
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Shorts & Skirts
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Co-ords
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Playsuits
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Jumpsuits
                          </Link>
                          <Link className="mobile-sub-link-child ">Shrugs</Link>
                          <Link className="mobile-sub-link-child ">
                            Sweaters & Sweatshirts
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Jackets & Coats
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Blazers & Waistcoats
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Plus Size
                      </Link>
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Maternity
                      </Link>
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Sunglasses & Frames
                      </Link>
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Footwear
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("women-footwear")
                          }
                        >
                          {subFashionDropdown === "women-footwear" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "women-footwear" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">Flats</Link>
                          <Link className="mobile-sub-link-child ">
                            Casual Shoes
                          </Link>
                          <Link className="mobile-sub-link-child ">Heels</Link>
                          <Link className="mobile-sub-link-child ">Boots</Link>
                          <Link className="mobile-sub-link-child ">
                            Sports Shoes & Floaters
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Sports & Active Wear
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("women-sports-wear")
                          }
                        >
                          {subFashionDropdown === "women-sports-wear" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "women-sports-wear" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Clothing
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Footwear
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Sports Accessories
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Sports Equipment
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Lingerie & Sleepwear
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("women-lingerie-sleepwear")
                          }
                        >
                          {subFashionDropdown === "women-lingerie-sleepwear" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "women-lingerie-sleepwear" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">Bra</Link>
                          <Link className="mobile-sub-link-child ">Briefs</Link>
                          <Link className="mobile-sub-link-child ">
                            Shapewear
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Sleepwear & Loungewear
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Swimwear
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Camisoles & Thermals
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Beauty & Personal Care
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("women-gadgets")
                          }
                        >
                          {subFashionDropdown === "women-gadgets" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "women-gadgets" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">Makeup</Link>
                          <Link className="mobile-sub-link-child ">
                            Skincare
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Lipsticks
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Fragrances
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Gadgets
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("women-Gadgets")
                          }
                        >
                          {subFashionDropdown === "women-Gadgets" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "women-Gadgets" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Smart Wearables
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Fitness Gadgets
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Headphones
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Speakers
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Jewellery
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("women-Jewellery")
                          }
                        >
                          {subFashionDropdown === "women-Jewellery" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "women-Jewellery" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Fashion Jewellery
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Fine Jewellery
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Earrings
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Backpacks
                      </Link>
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Handbags, Bags & Wallets
                      </Link>
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Luggages & Trolleys
                      </Link>
                    </Box>
                  </>
                )}
              </Box>
              <Box sx={{ marginLeft: "10px" }}>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Link className="mobile-main-link">KIDS</Link>
                  <span
                    className="mobile-dropdown-logo-container"
                    onClick={() => handleMainFashionDropdown("kids")}
                  >
                    {mainFashionDropdown === "kids" ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowRightIcon />
                    )}
                  </span>
                </Box>
                {mainFashionDropdown === "kids" && (
                  <>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Boys Clothing
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("kids-boys-clothing")
                          }
                        >
                          {subFashionDropdown === "kids-boys-clothing" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "kids-boys-clothing" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Boys Clothing
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            T-Shirts
                          </Link>
                          <Link className="mobile-sub-link-child "></Link>
                          <Link className="mobile-sub-link-child ">Shirts</Link>
                          <Link className="mobile-sub-link-child ">Shorts</Link>
                          <Link className="mobile-sub-link-child ">Jeans</Link>
                          <Link className="mobile-sub-link-child ">
                            Trousers
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Clothing Sets
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Ethnic Wear
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Track Pants & Pyjamas
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Jacket, Sweater & Sweatshirts
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Party Wear
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Innerwear & Thermals
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Nightwear & Loungewear
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Value Packs
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Girls Clothing
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("kids-girls-clothing")
                          }
                        >
                          {subFashionDropdown === "kids-girls-clothing" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "kids-girls-clothing" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Dresses
                          </Link>
                          <Link className="mobile-sub-link-child ">Tops</Link>
                          <Link className="mobile-sub-link-child ">
                            Tshirts
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Clothing Sets
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Lehenga choli
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Kurta Sets
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Party wear
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Dungarees & Jumpsuits
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Skirts & shorts
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Tights & Leggings
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Jeans, Trousers & Capris
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Jacket, Sweater & Sweatshirts
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Innerwear & Thermals
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Nightwear & Loungewear
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Value Packs
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Footwear
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Footwear
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("kids-footwear")
                          }
                        >
                          {subFashionDropdown === "kids-footwear" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "kids-footwear" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Casual Shoes
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Flipflops
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Sports Shoes
                          </Link>
                          <Link className="mobile-sub-link-child ">Flats</Link>
                          <Link className="mobile-sub-link-child ">
                            Sandals
                          </Link>
                          <Link className="mobile-sub-link-child ">Heels</Link>
                          <Link className="mobile-sub-link-child ">
                            School Shoes
                          </Link>
                          <Link className="mobile-sub-link-child ">Socks</Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Toys & Games
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() => handleSubFashionDropdown("kids-toys")}
                        >
                          {subFashionDropdown === "kids-toys" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "kids-toys" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Learning & Development
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Activity Toys
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Soft Toys
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Action Figure / Play set
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Infants
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("kids-Infants")
                          }
                        >
                          {subFashionDropdown === "kids-Infants" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "kids-Infants" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Bodysuits
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Rompers & Sleepsuits
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Clothing Sets
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Tshirts & Tops
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Dresses
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Bottom wear
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Winter Wear
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Innerwear & Sleepwear
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Infant Care
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Home & Bath
                      </Link>
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Personal Care
                      </Link>
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Kids Accessories
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("kids-accessories")
                          }
                        >
                          {subFashionDropdown === "kids-accessories" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "kids-accessories" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Bodysuits
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Rompers & Sleepsuits
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Bags & Backpacks
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Watches
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Jewellery & Hair accessory
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Sunglasses
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Masks & Protective Gears
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Caps & Hats
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Brands
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("kids-brands")
                          }
                        >
                          {subFashionDropdown === "kids-brands" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "kids-brands" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Bodysuits
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Rompers & Sleepsuits
                          </Link>
                          <Link className="mobile-sub-link-child ">H&M</Link>
                          <Link className="mobile-sub-link-child ">
                            Max Kids
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Pantaloons
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            United Colors Of Benetton Kids
                          </Link>
                          <Link className="mobile-sub-link-child ">YK</Link>
                          <Link className="mobile-sub-link-child ">
                            U.S. Polo Assn. Kids
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Mothercare
                          </Link>
                          <Link className="mobile-sub-link-child ">HRX</Link>
                        </Box>
                      )}
                    </Box>
                  </>
                )}
              </Box>
              <Box sx={{ marginLeft: "10px" }}>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Link className="mobile-main-link">HOME & LIVING</Link>
                  <span
                    className="mobile-dropdown-logo-container"
                    onClick={() => handleMainFashionDropdown("home")}
                  >
                    {mainFashionDropdown === "home" ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowRightIcon />
                    )}
                  </span>
                </Box>
                {mainFashionDropdown === "home" && (
                  <>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Bed Linen & Furnishing
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("home-bed-furnishing")
                          }
                        >
                          {subFashionDropdown === "home-bed-furnishing" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "home-bed-furnishing" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Bed Runners
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Mattress Protectors
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Bedsheets
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Bedding Sets
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Blankets, Quilts & Dohars
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Pillows & Pillow Covers
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Bed Covers
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Diwan Sets
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Chair Pads & Covers
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Sofa Covers
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Flooring
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("home-Flooring")
                          }
                        >
                          {subFashionDropdown === "home-Flooring" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "home-Flooring" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Floor Runners
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Carpets
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Floor Mats & Dhurries
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Door Mats
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Bath
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() => handleSubFashionDropdown("home-Bath")}
                        >
                          {subFashionDropdown === "home-Bath" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "home-Bath" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Bath Towels
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Hand & Face Towels
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Beach Towels
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Towels Set
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Bath Rugs
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Bath Robes
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Bathroom Accessories
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Shower Curtains
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Lamps & Lighting
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("home-lamps-lighting")
                          }
                        >
                          {subFashionDropdown === "home-lamps-lighting" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "home-lamps-lighting" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Floor Lamps
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Ceiling Lamps
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Table Lamps
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Wall Lamps
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Outdoor Lamps
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            String Lights
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Home Décor
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() => handleSubFashionDropdown("home-Décor")}
                        >
                          {subFashionDropdown === "home-Décor" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "home-Décor" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Plants & Planters
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Aromas & Candles
                          </Link>
                          <Link className="mobile-sub-link-child ">Clocks</Link>
                          <Link className="mobile-sub-link-child ">
                            Mirrors
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Wall Décor
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Festive Decor
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Pooja Essentials
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Wall Shelves
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Fountains
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Showpieces & Vases
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Ottoman
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Cushions & Cushion Covers
                      </Link>
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Curtains
                      </Link>
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Home Gift Sets
                      </Link>
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Kitchen & Table
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("home-kitchen-table")
                          }
                        >
                          {subFashionDropdown === "home-kitchen-table" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "home-kitchen-table" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Table Runners
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Dinnerware & Serveware
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Cups and Mugs
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Bakeware & Cookware
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Kitchen Storage & Tools
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Bar & Drinkware
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Table Covers & Furnishings
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Storage
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("home-Storage")
                          }
                        >
                          {subFashionDropdown === "home-Storage" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "home-Storage" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">Bins</Link>
                          <Link className="mobile-sub-link-child ">
                            Hangers
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Organisers
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Hooks & Holders
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Laundry Bags
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Brands
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("home-Brands")
                          }
                        >
                          {subFashionDropdown === "home-Brands" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "home-Brands" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">H&M</Link>
                          <Link className="mobile-sub-link-child ">
                            Marks & Spencer
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Home Centre
                          </Link>
                          <Link className="mobile-sub-link-child ">Spaces</Link>
                          <Link className="mobile-sub-link-child ">
                            D'Decor
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Story@Home
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Pure Home & Living
                          </Link>
                          <Link className="mobile-sub-link-child ">Swayam</Link>
                          <Link className="mobile-sub-link-child ">
                            Raymond Home
                          </Link>
                          <Link className="mobile-sub-link-child ">Maspar</Link>
                          <Link className="mobile-sub-link-child ">
                            My Trident
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Cortina
                          </Link>
                          <Link className="mobile-sub-link-child ">Random</Link>
                          <Link className="mobile-sub-link-child ">
                            Ellementry
                          </Link>
                          <Link className="mobile-sub-link-child ">ROMEE</Link>
                          <Link className="mobile-sub-link-child ">
                            SEJ by Nisha Gupta
                          </Link>
                        </Box>
                      )}
                    </Box>
                  </>
                )}
              </Box>
              <Box sx={{ marginLeft: "10px" }}>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Link className="mobile-main-link">BEAUTY</Link>
                  <span
                    className="mobile-dropdown-logo-container"
                    onClick={() => handleMainFashionDropdown("beauty")}
                  >
                    {mainFashionDropdown === "beauty" ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowRightIcon />
                    )}
                  </span>
                </Box>
                {mainFashionDropdown === "beauty" && (
                  <>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Makeup
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("beauty-Makeup")
                          }
                        >
                          {subFashionDropdown === "beauty-Makeup" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "beauty-Makeup" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Lipstick
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Lip Gloss
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Lip Liner
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Mascara
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Eyeliner
                          </Link>
                          <Link className="mobile-sub-link-child ">Kajal</Link>
                          <Link className="mobile-sub-link-child ">
                            Eyeshadow
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Foundation
                          </Link>
                          <Link className="mobile-sub-link-child ">Primer</Link>
                          <Link className="mobile-sub-link-child ">
                            Concealer
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Compact
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Nail Polish
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Skincare, Bath & Body
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown(
                              "beauty-skincare-bath-body"
                            )
                          }
                        >
                          {subFashionDropdown ===
                          "beauty-skincare-bath-body" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "beauty-skincare-bath-body" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Face Moisturiser
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Cleanser
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Masks & Peel
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Sunscreen
                          </Link>
                          <Link className="mobile-sub-link-child ">Serum</Link>
                          <Link className="mobile-sub-link-child ">
                            Face Wash
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Eye Cream
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Lip Balm
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Body Lotion
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Body Wash
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Body Scrub
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Hand Cream
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Baby Care
                      </Link>
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Link
                        className="mobile-sub-link"
                        onClick={handleCloseButton}
                      >
                        Masks
                      </Link>
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Haircare
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("beauty-Haircare")
                          }
                        >
                          {subFashionDropdown === "beauty-Haircare" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "beauty-Haircare" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Shampoo
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Conditioner
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Hair Cream
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Hair Oil
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Hair Gel
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Hair Color
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Hair Serum
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Hair Accessory
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Fragrances
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("beauty-Fragrances")
                          }
                        >
                          {subFashionDropdown === "beauty-Fragrances" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "beauty-Fragrances" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Perfume
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Deodorant
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Body Mist
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Appliances
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("beauty-Appliances")
                          }
                        >
                          {subFashionDropdown === "beauty-Appliances" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "beauty-Appliances" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Hair Straightener
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Hair Dryer
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Epilator
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Men's Grooming
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("beauty-Men's-Grooming")
                          }
                        >
                          {subFashionDropdown === "beauty-Men's-Grooming" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "beauty-Men's-Grooming" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Trimmers
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Beard Oil
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Hair Wax
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Beauty Gift & Makeup Set
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("beauty-gifts-makeup-set")
                          }
                        >
                          {subFashionDropdown === "beauty-gifts-makeup-set" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "beauty-gifts-makeup-set" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">
                            Beauty Gift
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Makeup Kit
                          </Link>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Link
                          className="mobile-sub-link"
                          onClick={handleCloseButton}
                        >
                          Top Brands
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("beauty-Top-Brands")
                          }
                        >
                          {subFashionDropdown === "beauty-Top-Brands" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "beauty-Top-Brands" && (
                        <Box onClick={handleCloseButton}>
                          <Link className="mobile-sub-link-child ">Lakme</Link>
                          <Link className="mobile-sub-link-child ">
                            Maybelline
                          </Link>
                          <Link className="mobile-sub-link-child ">Loreal</Link>
                          <Link className="mobile-sub-link-child ">
                            Philips
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Bath & Body Works
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            The Body Shop
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Biotique
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Mamaearth
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            MCaffeine
                          </Link>
                          <Link className="mobile-sub-link-child ">Nivea</Link>
                          <Link className="mobile-sub-link-child ">
                            Lotus Herbals
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            Loreal Professionnel{" "}
                          </Link>
                          <Link className="mobile-sub-link-child ">
                            KAMA AYURVEDA
                          </Link>
                          <Link className="mobile-sub-link-child ">M.A.C</Link>
                          <Link className="mobile-sub-link-child ">
                            Forest Essentials
                          </Link>
                        </Box>
                      )}
                    </Box>
                  </>
                )}
              </Box>
              <Box sx={{ marginLeft: "10px" }}>
                <Link className="mobile-main-link">ONLINE LEARNING</Link>
              </Box>
            </Box>
          )}
          <Box display={{ xs: "none", sm: "block" }}>
            <Link
              onClick={() => handleDropDown(null)}
              onMouseEnter={() => handleDropDown(null)}
              to="/"
            >
              <img className="logo" src={logo} alt="unlock discounts logo" />
            </Link>
          </Box>
          <Box
            display={{ xs: "flex", sm: "none" }}
            sx={{ justifyContent: "center", fontSize: "10px", gap: "10px" }}
          >
            <MenuIcon onClick={() => setHamburger(true)} />
            <Link to="/">
              <h1 className="mobile-logo">UnlockDiscounts</h1>
            </Link>
          </Box>
          <Box
            display={{ xs: "none", sm: "flex" }}
            sx={{
              fontSize: { xs: "5px", sm: "20px" },
              gap: { xs: "8px", sm: "35px" },
              fontWeight: { xs: "500", sm: "600" },
              justifyContent: "center",
            }}
          >
            <span className="link-container">
              <Link onMouseEnter={() => handleDropDown("men")}>MEN </Link>
              <span
                className={navSelection === "men" ? "link-underline" : ""}
              ></span>
            </span>

            {navSelection === "men" && (
              <Box
                className="dorpDown-container"
                display={{ xs: "none", sm: "flex" }}
                sx={dropDownContainerStyles}
                onMouseLeave={() => handleDropDown(null)}
              >
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
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
                  <span className="black-horizantal-line"></span>
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
                    height: "inherit",
                  }}
                >
                  <Link className="red-heading">Bottomwear</Link>
                  <Link>Jeans</Link>
                  <Link>Casual Trousers</Link>
                  <Link>Formal Trousers</Link>
                  <Link>Shorts</Link>
                  <Link>Track Pants & Joggers</Link>
                  <span className="black-horizantal-line"></span>

                  <Link className="red-heading">Innerwear & Sleepwear</Link>
                  <Link>Briefs & Trunks</Link>
                  <Link>Boxers</Link>
                  <Link>Vests</Link>
                  <Link>leepwear & Loungewear</Link>
                  <Link>Thermals</Link>
                  <span className="black-horizantal-line"></span>

                  <Link className="red-heading">Plus Size</Link>
                </Box>
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
                  }}
                >
                  <Link className="red-heading">Footwear</Link>
                  <Link>Casual Shoes</Link>
                  <Link>Sports Shoes</Link>
                  <Link>Sneakers</Link>
                  <Link>Sandals & Floaters</Link>
                  <Link>Flip Flops</Link>
                  <Link>Socks</Link>
                  <span className="black-horizantal-line"></span>

                  <Link className="red-heading">Personal Care & Grooming</Link>
                  <Link className="red-heading">Sunglasses & Frames</Link>
                  <Link className="red-heading">Watches</Link>
                </Box>
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
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
                  <span className="black-horizantal-line"></span>

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
                    height: "inherit",
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

                  <span className="black-horizantal-line"></span>

                  <Link className="red-heading">Bags & Backpacks</Link>
                  <Link className="red-heading">Luggages & Trolleys</Link>
                </Box>
              </Box>
            )}
            <span className="link-container">
              <Link onMouseEnter={() => handleDropDown("women")}>WOMEN</Link>

              <span
                className={navSelection === "women" ? "link-underline" : ""}
              ></span>
            </span>
            {navSelection === "women" && (
              <Box
                className="dorpDown-container"
                onMouseLeave={() => handleDropDown(null)}
                display={{ xs: "none", sm: "flex" }}
                sx={dropDownContainerStyles}
              >
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
                  }}
                >
                  <Link className="pink-heading">Indian & Fusion Wear</Link>
                  <Link>Kurtas & Suits</Link>
                  <Link>Kurtis, Tunics & Tops</Link>
                  <Link>Sarees</Link>
                  <Link>Ethnic Wear</Link>
                  <Link>Leggings, Salwars & Churidars</Link>
                  <Link>Skirts & Palazzos</Link>
                  <Link>Dress Materials</Link>
                  <Link>Lehenga Cholis</Link>
                  <Link>Dupattas & Shawls</Link>
                  <Link>Jackets</Link>

                  <span className="black-horizantal-line"></span>
                  <Link className="pink-heading">Belts, Scarves & More</Link>
                  <Link className="pink-heading">Watches & Wearables</Link>
                </Box>
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
                  }}
                >
                  <Link className="pink-heading">Western Wear</Link>
                  <Link>Dresses</Link>
                  <Link>Tops</Link>
                  <Link>Tshirts</Link>
                  <Link>Jeans</Link>
                  <Link>Trousers & Capris</Link>
                  <Link>Shorts & Skirts</Link>
                  <Link>Co-ords</Link>
                  <Link>Playsuits</Link>
                  <Link>Jumpsuits</Link>
                  <Link>Shrugs</Link>
                  <Link>Sweaters & Sweatshirts</Link>
                  <Link>Jackets & Coats</Link>
                  <Link>Blazers & Waistcoats</Link>

                  <span className="black-horizantal-line"></span>

                  <Link className="pink-heading">Plus Size</Link>
                </Box>
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
                  }}
                >
                  <Link className="pink-heading">Maternity</Link>
                  <Link className="pink-heading">Sunglasses & Frames</Link>
                  <Link className="pink-heading">Footwear</Link>

                  <Link>Flats</Link>
                  <Link>Casual Shoes</Link>
                  <Link>Heels</Link>
                  <Link>Boots</Link>
                  <Link>Sports Shoes & Floaters</Link>
                  <span className="black-horizantal-line"></span>
                  <Link className="pink-heading">Sports & Active Wear</Link>
                  <Link>Clothing</Link>
                  <Link>Footwear</Link>
                  <Link>Sports Accessories</Link>
                  <Link>Sports Equipment</Link>
                </Box>
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
                  }}
                >
                  <Link className="pink-heading">Lingerie & Sleepwear</Link>
                  <Link>Bra</Link>
                  <Link>Briefs</Link>
                  <Link>Shapewear</Link>
                  <Link>Sleepwear & Loungewear</Link>
                  <Link>Swimwear</Link>
                  <Link>Camisoles & Thermals</Link>
                  <span className="black-horizantal-line"></span>

                  <Link className="pink-heading">Beauty & Personal Care</Link>
                  <Link>Makeup</Link>
                  <Link>Skincare</Link>
                  <Link>Premium Beauty</Link>
                  <Link>Lipsticks</Link>
                  <Link>Fragrances</Link>
                </Box>
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
                  }}
                >
                  <Link className="pink-heading">Gadgets</Link>
                  <Link>Smart Wearables</Link>
                  <Link>Fitness Gadgets</Link>
                  <Link>Headphones</Link>
                  <Link>Speakers</Link>
                  <span className="black-horizantal-line"></span>

                  <Link className="pink-heading">Jewellery</Link>
                  <Link>Fashion Jewellery</Link>
                  <Link>Fine Jewellery</Link>
                  <Link>Earrings</Link>

                  <span className="black-horizantal-line"></span>

                  <Link className="pink-heading">Backpacks</Link>
                  <Link className="pink-heading">Handbags, Bags & Wallets</Link>
                  <Link className="pink-heading">Luggages & Trolleys</Link>
                </Box>
              </Box>
            )}
            <span className="link-container">
              <Link onMouseEnter={() => handleDropDown("kids")}>KIDS</Link>

              <span
                className={navSelection === "kids" ? "link-underline" : ""}
              ></span>
            </span>
            {navSelection === "kids" && (
              <Box
                className="dorpDown-container"
                onMouseLeave={() => handleDropDown(null)}
                display={{ xs: "none", sm: "flex" }}
                sx={dropDownContainerStyles}
              >
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "7px",
                    height: "inherit",
                  }}
                >
                  <Link className="orange-heading">Boys Clothing</Link>
                  <Link>T-Shirts</Link>
                  <Link>Shirts</Link>
                  <Link>Shorts</Link>
                  <Link>Jeans</Link>
                  <Link>Trousers</Link>
                  <Link>Clothing Sets</Link>
                  <Link>Ethnic Wear</Link>
                  <Link>Track Pants & Pyjamas</Link>
                  <Link>Jacket, Sweater & Sweatshirts</Link>
                  <Link>Party Wear</Link>
                  <Link>Innerwear & Thermals</Link>
                  <Link>Nightwear & Loungewear</Link>
                  <Link>Value Packs</Link>
                </Box>
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "7px",
                    height: "inherit",
                  }}
                >
                  <Link className="orange-heading">Girls Clothing</Link>
                  <Link>Dresses</Link>
                  <Link>Tops</Link>
                  <Link>Tshirts</Link>
                  <Link>Clothing Sets</Link>
                  <Link>Lehenga choli</Link>
                  <Link>Kurta Sets</Link>
                  <Link>Party wear</Link>
                  <Link>Dungarees & Jumpsuits</Link>
                  <Link>Skirts & shorts</Link>
                  <Link>Tights & Leggings</Link>
                  <Link>Jeans, Trousers & Capris</Link>
                  <Link>Jacket, Sweater & Sweatshirts</Link>
                  <Link>Innerwear & Thermals</Link>
                  <Link>Nightwear & Loungewear</Link>
                  <Link>Value Packs</Link>
                </Box>
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
                  }}
                >
                  <Link className="orange-heading">Footwear</Link>
                  <Link>Casual Shoes</Link>
                  <Link>Flipflops</Link>
                  <Link>Sports Shoes</Link>
                  <Link>Flats</Link>
                  <Link>Sandals</Link>
                  <Link>Heels</Link>
                  <Link>School Shoes</Link>
                  <Link>Socks</Link>
                  <span className="black-horizantal-line"></span>

                  <Link className="orange-heading">Toys & Games</Link>
                  <Link>Learning & Development</Link>
                  <Link>Activity Toys</Link>
                  <Link>Soft Toys</Link>
                  <Link>Action Figure / Play set</Link>
                </Box>
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "6px",
                    height: "inherit",
                  }}
                >
                  <Link className="orange-heading">Infants</Link>
                  <Link>Bodysuits</Link>
                  <Link>Rompers & Sleepsuits</Link>
                  <Link>Clothing Sets</Link>
                  <Link>Tshirts & Tops</Link>
                  <Link>Dresses</Link>
                  <Link>Bottom wear</Link>
                  <Link>Winter Wear</Link>
                  <Link>Innerwear & Sleepwear</Link>
                  <Link>Infant Care</Link>
                  <span className="black-horizantal-line"></span>
                  <Link className="orange-heading">Home & Bath</Link>
                  <Link className="orange-heading">Personal Care</Link>
                </Box>
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
                  }}
                >
                  <Link className="orange-heading">Kids Accessories</Link>
                  <Link>Bags & Backpacks</Link>
                  <Link>Watches</Link>
                  <Link>Jewellery & Hair accessory</Link>
                  <Link>Sunglasses</Link>
                  <Link>Masks & Protective Gears</Link>
                  <Link>Caps & Hats</Link>
                  <span className="black-horizantal-line"></span>

                  <Link className="orange-heading">Brands</Link>
                  <Link>H&M</Link>
                  <Link>Max Kids</Link>
                  <Link>Pantaloons</Link>
                  <Link>United Colors Of Benetton Kids</Link>
                  <Link>YK</Link>
                  <Link>U.S. Polo Assn. Kids</Link>
                  <Link t>Mothercare</Link>
                  <Link>HRX</Link>
                </Box>
              </Box>
            )}
            <span className="link-container">
              <Link onMouseEnter={() => handleDropDown("home&living")}>
                HOME & LIVING
              </Link>

              <span
                className={
                  navSelection === "home&living" ? "link-underline" : ""
                }
              ></span>
            </span>

            {navSelection === "home&living" && (
              <Box
                className="dorpDown-container"
                onMouseLeave={() => handleDropDown(null)}
                display={{ xs: "none", sm: "flex" }}
                sx={dropDownContainerStyles}
              >
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
                  }}
                >
                  <Link className="yellow-heading">Bed Linen & Furnishing</Link>
                  <Link>Bed Runners</Link>
                  <Link>Mattress Protectors</Link>
                  <Link>Bedsheets</Link>
                  <Link>Bedding Sets</Link>
                  <Link>Blankets, Quilts & Dohars</Link>
                  <Link>Pillows & Pillow Covers</Link>
                  <Link>Bed Covers</Link>
                  <Link>Diwan Sets</Link>
                  <Link>Chair Pads & Covers</Link>
                  <Link>Sofa Covers</Link>
                  <span className="black-horizantal-line"></span>
                  <Link className="yellow-heading">Flooring</Link>
                  <Link>Floor Runners</Link>
                  <Link>Carpets</Link>
                  <Link>Floor Mats & Dhurries</Link>
                  <Link>Door Mats</Link>
                </Box>
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
                  }}
                >
                  <Link className="yellow-heading">Bath</Link>
                  <Link>Bath Towels</Link>
                  <Link>Hand & Face Towels</Link>
                  <Link>Beach Towels</Link>
                  <Link>Towels Set</Link>
                  <Link>Bath Rugs</Link>
                  <Link>Bath Robes</Link>
                  <Link>Bathroom Accessories</Link>
                  <Link>Shower Curtains</Link>
                  <span className="black-horizantal-line"></span>

                  <Link className="yellow-heading">Lamps & Lighting</Link>
                  <Link>Floor Lamps</Link>
                  <Link>Ceiling Lamps</Link>
                  <Link>Table Lamps</Link>
                  <Link>Wall Lamps</Link>
                  <Link>Outdoor Lamps</Link>
                  <Link>String Lights</Link>
                </Box>
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
                  }}
                >
                  <Link className="yellow-heading">Home Décor</Link>
                  <Link>Plants & Planters</Link>
                  <Link>Aromas & Candles</Link>
                  <Link>Clocks</Link>
                  <Link>Mirrors</Link>
                  <Link>Wall Décor</Link>
                  <Link>Festive Decor</Link>
                  <Link>Pooja Essentials</Link>
                  <Link>Wall Shelves</Link>
                  <Link>Fountains</Link>
                  <Link>Showpieces & Vases</Link>
                  <Link>Ottoman</Link>
                  <span className="black-horizantal-line"></span>
                  <Link className="yellow-heading">
                    Cushions & Cushion Covers
                  </Link>
                  <Link className="yellow-heading">Curtains</Link>
                </Box>
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
                  }}
                >
                  <Link className="yellow-heading">Home Gift Sets</Link>
                  <Link className="yellow-heading">Kitchen & Table</Link>
                  <Link>Table Runners</Link>
                  <Link>Dinnerware & Serveware</Link>
                  <Link>Cups and Mugs</Link>
                  <Link>Bakeware & Cookware</Link>
                  <Link>Kitchen Storage & Tools</Link>
                  <Link>Bar & Drinkware</Link>
                  <Link>Table Covers & Furnishings</Link>
                  <span className="black-horizantal-line"></span>
                  <Link className="yellow-heading">Storage</Link>
                  <Link>Bins</Link>
                  <Link>Hangers</Link>
                  <Link>Organisers</Link>
                  <Link>Hooks & Holders</Link>
                  <Link>Laundry Bags</Link>
                </Box>
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
                  }}
                >
                  <Link className="yellow-heading">Brands</Link>
                  <Link>H&M</Link>
                  <Link>Marks & Spencer</Link>
                  <Link>Home Centre</Link>
                  <Link>Spaces</Link>
                  <Link>D'Decor</Link>
                  <Link>Story@Home</Link>
                  <Link>Pure Home & Living</Link>
                  <Link>Swayam</Link>
                  <Link>Raymond Home</Link>
                  <Link>Maspar</Link>
                  <Link>My Trident</Link>
                  <Link>Cortina</Link>
                  <Link>Random</Link>
                  <Link>Ellementry</Link>
                  <Link>ROMEE</Link>
                  <Link>SEJ by Nisha Gupta</Link>
                </Box>
              </Box>
            )}
            <span className="link-container">
              <Link onMouseEnter={() => handleDropDown("beauty")}>BEAUTY</Link>

              <span
                className={navSelection === "beauty" ? "link-underline" : ""}
              ></span>
            </span>
            {navSelection === "beauty" && (
              <Box
                className="dorpDown-container"
                onMouseLeave={() => handleDropDown(null)}
                display={{ xs: "none", sm: "flex" }}
                sx={dropDownContainerStyles}
              >
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
                  }}
                >
                  <Link className="green-heading">Makeup</Link>
                  <Link>Lipstick</Link>
                  <Link>Lip Gloss</Link>
                  <Link>Lip Liner</Link>
                  <Link>Mascara</Link>
                  <Link>Eyeliner</Link>
                  <Link>Kajal</Link>
                  <Link>Eyeshadow</Link>
                  <Link>Foundation</Link>
                  <Link>Primer</Link>
                  <Link>Concealer</Link>
                  <Link>Compact</Link>
                  <Link>Nail Polish</Link>
                </Box>
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
                  }}
                >
                  <Link className="green-heading">Skincare, Bath & Body</Link>
                  <Link>Face Moisturiser</Link>
                  <Link>Cleanser</Link>
                  <Link>Masks & Peel</Link>
                  <Link>Sunscreen</Link>
                  <Link>Serum</Link>
                  <Link>Face Wash</Link>
                  <Link>Eye Cream</Link>
                  <Link>Lip Balm</Link>
                  <Link>Body Lotion</Link>
                  <Link>Body Wash</Link>
                  <Link>Body Scrub</Link>
                  <Link>Hand Cream</Link>
                  <span className="black-horizantal-line"></span>

                  <Link className="green-heading">Baby Care</Link>
                  <Link className="green-heading">Masks</Link>
                </Box>
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
                  }}
                >
                  <Link className="green-heading">Haircare</Link>
                  <Link>Shampoo</Link>
                  <Link>Conditioner</Link>
                  <Link>Hair Cream</Link>
                  <Link>Hair Oil</Link>
                  <Link>Hair Gel</Link>
                  <Link>Hair Color</Link>
                  <Link>Hair Serum</Link>
                  <Link>Hair Accessory</Link>
                  <span className="black-horizantal-line"></span>
                  <Link className="green-heading">Fragrances</Link>
                  <Link>Perfume</Link>
                  <Link>Deodorant</Link>
                  <Link>Body Mist</Link>
                </Box>
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
                  }}
                >
                  <Link className="green-heading">Appliances</Link>
                  <Link>Hair Straightener</Link>
                  <Link>Hair Dryer</Link>
                  <Link>Epilator</Link>
                  <span className="black-horizantal-line"></span>

                  <Link className="green-heading">Men's Grooming</Link>
                  <Link>Trimmers</Link>
                  <Link>Beard Oil</Link>
                  <Link>Hair Wax</Link>
                  <span className="black-horizantal-line"></span>
                  <Link className="green-heading">
                    Beauty Gift & Makeup Set
                  </Link>
                  <Link>Beauty Gift</Link>
                  <Link>Makeup Kit</Link>
                  <span className="black-horizantal-line"></span>
                  <Link className="green-heading">Premium Beauty</Link>
                  <Link className="green-heading">Wellness & Hygiene</Link>
                </Box>
                <Box
                  sx={{
                    display: { sm: "flex" },
                    flexDirection: "column",
                    gap: "5px",
                    height: "inherit",
                  }}
                >
                  <Link className="green-heading">Top Brands</Link>

                  <Link>Lakme</Link>
                  <Link>Maybelline</Link>
                  <Link>Loreal</Link>
                  <Link>Philips</Link>
                  <Link>Bath & Body Works</Link>
                  <Link>The Body Shop</Link>
                  <Link>Biotique</Link>
                  <Link>Mamaearth</Link>
                  <Link>Mcaffeine</Link>
                  <Link>Nivea</Link>
                  <Link>Lotus Herbals</Link>
                  <Link>Loreal Professionnel</Link>
                  <Link>KAMA AYURVEDA</Link>
                  <Link>M.A.C</Link>
                  <Link>Forest Essentials</Link>
                </Box>
              </Box>
            )}

            <Link
              onMouseEnter={() => handleDropDown(null)}
              to="/distancelearning"
            >
              ONLINE LEARNING
            </Link>
          </Box>
          <Box
            className="search-bar"
            sx={{
              width: { xs: "160px", sm: "377px" },
              height: { xs: "30px", sm: "48px" },
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
