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
  // styles for the drop down container
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

  //men fashion links object
  const men = {
    topWear: [
      ["/", "T-Shirts"],
      ["/", "Casual Shirts"],
      ["/", "Formal Shirts"],
      ["/", "Sweatshirts"],
      ["/", "Sweaters"],
      ["/", "Jackets"],
      ["/", "Blazers & Coats"],
      ["/", "Suits"],
      ["/", "Rain Jackets"],
    ],
    indianFestivalWear: [
      ["/", "Kurtas & Kurta Sets"],
      ["/", "Sherwanis"],
      ["/", "Nehru Jackets"],
      ["/", "Dhotis"],
    ],
    bottomWear: [
      ["/", "Jeans"],
      ["/", "Casual Trousers"],
      ["/", "Formal Trousers"],
      ["/", "Shorts"],
      ["/", "Track Pants & Joggers"],
    ],
    innerWear: [
      ["/", "Briefs & Trunks"],
      ["/", "Boxers"],
      ["/", "Vests"],
      ["/", "Sleepwear & Loungewear"],
      ["/", "Thermals"],
    ],
    footwear: [
      ["/", "Casual Shoes"],
      ["/", "Sports Shoes"],
      ["/", "Sneakers"],
      ["/", "Formal Shoes"],
      ["/", "Sandals & Floaters"],
      ["/", "Flip Flops"],
      ["/", "Socks"],
    ],
    sports: [
      ["/", "Sports Shoes"],
      ["/", "Sports Sandals"],
      ["/", "Active T-Shirts"],
      ["/", "Track Pants & Shorts"],
      ["/", "Track Suits"],
      ["/", "Jackets & Sweatshirts"],
      ["/", "Sports Accessories"],
      ["/", "Swimwear"],
    ],
    gadgets: [
      ["/", "Smart Wearables"],
      ["/", "Fitness Gadgets"],
      ["/", "Headphones"],
      ["/", "Speakers"],
    ],
    fashionAccessories: [
      ["/", "Wallets"],
      ["/", "Belts"],
      ["/", "Perfumes & Body Mists"],
      ["/", "Trimmers"],
      ["/", "Deodorants"],
      ["/", "Ties, Cufflinks & Pocket Squares"],
      ["/", "Accessory Gift Sets"],
      ["/", "Caps & Hats"],
      ["/", "Mufflers, Scarves & Gloves"],
      ["/", "Phone Cases"],
      ["/", "Rings & Wristwear"],
      ["/", "Helmets"],
    ],
  };

  // women fashion links object
  const women = {
    indianFusionWear: [
      ["/", "Kurtas & Suits"],
      ["/", "Kurtis, Tunics & Tops"],
      ["/", "Sarees"],
      ["/", "Ethnic Wear"],
      ["/", "Leggings, Salwars & Churidars"],
      ["/", "Skirts & Palazzos"],
      ["/", "Dress Materials"],
      ["/", "Lehenga Cholis"],
      ["/", "Dupattas & Shawls"],
      ["/", "Jackets"],
    ],
    westernWear: [
      ["/", "Dresses"],
      ["/", "Tops"],
      ["/", "Tshirts"],
      ["/", "Jeans"],
      ["/", "Trousers & Capris"],
      ["/", "Shorts & Skirts"],
      ["/", "Co-ords"],
      ["/", "Playsuits"],
      ["/", "Jumpsuits"],
      ["/", "Shrugs"],
      ["/", "Sweaters & Sweatshirts"],
      ["/", "Jackets & Coats"],
      ["/", "Blazers & Waistcoats"],
    ],
    Footwear: [
      ["/", "Flats"],
      ["/", "Casual Shoes"],
      ["/", "Heels"],
      ["/", "Boots"],
      ["/", "Sports Shoes & Floaters"],
    ],
    sports: [
      ["/", "Clothing"],
      ["/", "Footwear"],
      ["/", "Sports Accessories"],
      ["/", "Sports Equipment"],
    ],
    lingerieAndSleepWear: [
      ["/", "Bra"],
      ["/", "Briefs"],
      ["/", "Shapewear"],
      ["/", "Sleepwear & Loungewear"],
      ["/", "Swimwear"],
      ["/", "Camisoles & Thermals"],
    ],
    beautyAndPersonalCare: [
      ["/", "Makeup"],
      ["/", "Skincare"],
      ["/", "Premium Beauty"],
      ["/", "Lipsticks"],
      ["/", "Fragrances"],
    ],
    gadgets: [
      ["/", "Smart Wearables"],
      ["/", "Fitness Gadgets"],
      ["/", "Headphones"],
      ["/", "Speakers"],
    ],
    jewellery: [
      ["/", "Fashion Jewellery"],
      ["/", "Fine Jewellery"],
      ["/", "Earrings"],
    ],
  };
  // kids fashion links object
  const kids = {
    boysClothing: [
      ["/", "T-Shirts"],
      ["/", "Shirts"],
      ["/", "Shorts"],
      ["/", "Jeans"],
      ["/", "Trousers"],
      ["/", "Clothing Sets"],
      ["/", "Ethnic Wear"],
      ["/", "Track Pants & Pyjamas"],
      ["/", "Jacket, Sweater & Sweatshirts"],
      ["/", "Party Wear"],
      ["/", "Innerwear & Thermals"],
      ["/", "Nightwear & Loungewear"],
      ["/", "Value Packs"],
    ],
    girlsClothing: [
      ["/", "Dresses"],
      ["/", "Tops"],
      ["/", "Tshirts"],
      ["/", "Clothing Sets"],
      ["/", "Lehenga choli"],
      ["/", "Kurta Sets"],
      ["/", "Party wear"],
      ["/", "Dungarees & Jumpsuits"],
      ["/", "Skirts & shorts"],
      ["/", "Tights & Leggings"],
      ["/", "Jeans, Trousers & Capris"],
      ["/", "Jacket, Sweater & Sweatshirts"],
      ["/", "Innerwear & Thermals"],
      ["/", "Nightwear & Loungewear"],
      ["/", "Value Packs"],
    ],
    footwear: [
      ["/", "Casual Shoes"],
      ["/", "Flipflops"],
      ["/", "Sports Shoes"],
      ["/", "Flats"],
      ["/", "Sandals"],
      ["/", "Heels"],
      ["/", "School Shoes"],
      ["/", "Socks"],
    ],
    toysAndGames: [
      ["/", "Learning & Development"],
      ["/", "Activity Toys"],
      ["/", "Soft Toys"],
      ["/", "Action Figure / Play set"],
    ],
    infants: [
      ["/", "Bodysuits"],
      ["/", "Rompers & Sleepsuits"],
      ["/", "Clothing Sets"],
      ["/", "Tshirts & Tops"],
      ["/", "Dresses"],
      ["/", "Bottom wear"],
      ["/", "Winter Wear"],
      ["/", "Innerwear & Sleepwear"],
      ["/", "Infant Care"],
    ],
    kidsAccessories: [
      ["/", "Bags & Backpacks"],
      ["/", "Watches"],
      ["/", "Jewellery & Hair accessory"],
      ["/", "Sunglasses"],
      ["/", "Masks & Protective Gears"],
      ["/", "Caps & Hats"],
    ],
    brands: [
      ["/", "H&M"],
      ["/", "Max Kids"],
      ["/", "Pantaloons"],
      ["/", "United Colors Of Benetton Kids"],
      ["/", "YK"],
      ["/", "U.S. Polo Assn. Kids"],
      ["/", "Mothercare"],
      ["/", "HRX"],
    ],
  };

  //home and living links object
  const home = {
    bedLinen: [
      ["/", "Bed Runners"],
      ["/", "Mattress Protectors"],
      ["/", "Bedsheets"],
      ["/", "Bedding Sets"],
      ["/", "Blankets, Quilts & Dohars"],
      ["/", "Pillows & Pillow Covers"],
      ["/", "Bed Covers"],
      ["/", "Diwan Sets"],
      ["/", "Chair Pads & Covers"],
      ["/", "Sofa Covers"],
    ],
    flooring: [
      ["/", "Floor Runners"],
      ["/", "Carpets"],
      ["/", "Floor Mats & Dhurries"],
      ["/", "Door Mats"],
    ],
    bath: [
      ["/", "Bath Towels"],
      ["/", "Hand & Face Towels"],
      ["/", "Beach Towels"],
      ["/", "Towels Set"],
      ["/", "Bath Rugs"],
      ["/", "Bath Robes"],
      ["/", "Bathroom Accessories"],
      ["/", "Shower Curtains"],
    ],
    lamps: [
      ["/", "Floor Lamps"],
      ["/", "Ceiling Lamps"],
      ["/", "Table Lamps"],
      ["/", "Wall Lamps"],
      ["/", "Outdoor Lamps"],
      ["/", "String Lights"],
    ],
    homeDecor: [
      ["/", "Plants & Planters"],
      ["/", "Aromas & Candles"],
      ["/", "Clocks"],
      ["/", "Mirrors"],
      ["/", "Wall Décor"],
      ["/", "Festive Decor"],
      ["/", "Pooja Essentials"],
      ["/", "Wall Shelves"],
      ["/", "Fountains"],
      ["/", "Showpieces & Vases"],
      ["/", "Ottoman"],
    ],
    kitchen: [
      ["/", "Table Runners"],
      ["/", "Dinnerware & Serveware"],
      ["/", "Cups and Mugs"],
      ["/", "Bakeware & Cookware"],
      ["/", "Kitchen Storage & Tools"],
      ["/", "Bar & Drinkware"],
      ["/", "Table Covers & Furnishings"],
    ],
    storage: [
      ["/", "Bins"],
      ["/", "Hangers"],
      ["/", "Organisers"],
      ["/", "Hooks & Holders"],
      ["/", "Laundry Bags"],
    ],
    brands: [
      ["/", "H&M"],
      ["/", "Marks & Spencer"],
      ["/", "Home Centre"],
      ["/", "Spaces"],
      ["/", "D'Decor"],
      ["/", "Story@Home"],
      ["/", "Pure Home & Living"],
      ["/", "Swayam"],
      ["/", "Raymond Home"],
      ["/", "Maspar"],
      ["/", "My Trident"],
      ["/", "Cortina"],
      ["/", "Random"],
      ["/", "Ellementry"],
      ["/", "ROMEE"],
      ["/", "SEJ by Nisha Gupta"],
    ],
  };

  //beauty section links object
  const beauty = {
    makeup: [
      ["/", "Lipstick"],
      ["/", "Lip Gloss"],
      ["/", "Lip Liner"],
      ["/", "Mascara"],
      ["/", "Eyeliner"],
      ["/", "Kajal"],
      ["/", "Eyeshadow"],
      ["/", "Foundation"],
      ["/", "Primer"],
      ["/", "Concealer"],
      ["/", "Compact"],
      ["/", "Nail Polish"],
    ],
    skincare: [
      ["/", "Face Moisturiser"],
      ["/", "Cleanser"],
      ["/", "Masks & Peel"],
      ["/", "Sunscreen"],
      ["/", "Serum"],
      ["/", "Face Wash"],
      ["/", "Eye Cream"],
      ["/", "Lip Balm"],
      ["/", "Body Lotion"],
      ["/", "Body Wash"],
      ["/", "Body Scrub"],
      ["/", "Hand Cream"],
    ],
    hairCare: [
      ["/", "Shampoo"],
      ["/", "Conditioner"],
      ["/", "Hair Cream"],
      ["/", "Hair Oil"],
      ["/", "Hair Gel"],
      ["/", "Hair Color"],
      ["/", "Hair Serum"],
      ["/", "Hair Accessory"],
    ],
    fragrence: [
      ["/", "Perfume"],
      ["/", "Deodorant"],
      ["/", "Body Mist"],
    ],
    appliances: [
      ["/", "Hair Straightener"],
      ["/", "Hair Dryer"],
      ["/", "Epilator"],
    ],
    mensGrooming: [
      ["/", "Trimmers"],
      ["/", "Beard Oil"],
      ["/", "Hair Wax"],
    ],
    beautyGift: [
      ["/", "Beauty Gift"],
      ["/", "Makeup Kit"],
    ],
    topBrands: [
      ["/", "Lakme"],
      ["/", "Maybelline"],
      ["/", "Loreal"],
      ["/", "Philips"],
      ["/", "Bath & Body Works"],
      ["/", "The Body Shop"],
      ["/", "Biotique"],
      ["/", "Mamaearth"],
      ["/", "Mcaffeine"],
      ["/", "Nivea"],
      ["/", "Lotus Herbals"],
      ["/", "Loreal Professionnel"],
      ["/", "KAMA AYURVEDA"],
      ["/", "M.A.C"],
      ["/", "Forest Essentials"],
    ],
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
        {/* over the top black nav bar with 20%off signUP button  */}
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
                {/* mobile 50% offer logo */}

                <img
                  className="mobile-offer-banner"
                  src={offerBanner}
                  alt="offer banner"
                />
                {/* mobile nav close button */}
                <CloseIcon
                  onClick={handleCloseButton}
                  className="hamburger-closing-button"
                />
              </Box>
              {/* mobile men fashion */}
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
                {/* mobile men section drop down */}
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
                          Topwear
                        </Link>
                        <span
                          className="mobile-dropdown-logo-container"
                          onClick={() =>
                            handleSubFashionDropdown("men-topWear")
                          }
                        >
                          {subFashionDropdown === "men-topWear" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "men-topWear" && (
                        <Box onClick={handleCloseButton}>
                          {men.topWear.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {men.indianFestivalWear.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {men.bottomWear.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {men.innerWear.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {men.footwear.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {men.sports.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {men.gadgets.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {men.fashionAccessories.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
              {/* mobile women fashion section */}
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
                {/* mobile women fashion drop down section */}
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
                          {women.indianFusionWear.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {women.westernWear.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {women.Footwear.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {women.sports.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {women.lingerieAndSleepWear.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                            handleSubFashionDropdown("women-beauty")
                          }
                        >
                          {subFashionDropdown === "women-beauty" ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </span>
                      </Box>
                      {subFashionDropdown === "women-beauty" && (
                        <Box onClick={handleCloseButton}>
                          {women.beautyAndPersonalCare.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {women.gadgets.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {women.jewellery.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
              {/* mobile kids fashion section  */}
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
                {/* kids mobile  drop down fashion section  */}
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
                          {kids.boysClothing.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {kids.girlsClothing.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {kids.footwear.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {kids.toysAndGames.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {kids.infants.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {kids.kidsAccessories.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {kids.brands.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
                        </Box>
                      )}
                    </Box>
                  </>
                )}
              </Box>
              {/* home & living mobile nav section  */}
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
                {/* home & living mobile drop down section  */}
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
                          {home.bedLinen.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {home.flooring.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {home.bath.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {home.lamps.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {home.homeDecor.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {home.kitchen.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {home.storage.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {home.brands.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
                        </Box>
                      )}
                    </Box>
                  </>
                )}
              </Box>
              {/* beauty mobile section  */}
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
                {/* beauty mobile drop down section  */}
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
                          {beauty.makeup.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {beauty.skincare.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {beauty.hairCare.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {beauty.fragrence.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {beauty.appliances.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {beauty.mensGrooming.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {beauty.beautyGift.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
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
                          {beauty.topBrands.map((link, index) => {
                            return (
                              <Link
                                className="mobile-sub-link-child "
                                key={index}
                                to={link[0]}
                              >
                                {link[1]}
                              </Link>
                            );
                          })}
                        </Box>
                      )}
                    </Box>
                  </>
                )}
              </Box>
              {/* online learning mobile section  */}
              <Box sx={{ marginLeft: "10px" }}>
                <Link className="mobile-main-link">ONLINE LEARNING</Link>
              </Box>
            </Box>
          )}

          {/* desktop main logo  */}
          <Box display={{ xs: "none", sm: "block" }}>
            <Link
              onClick={() => handleDropDown(null)}
              onMouseEnter={() => handleDropDown(null)}
              to="/"
            >
              <img className="logo" src={logo} alt="unlock discounts logo" />
            </Link>
          </Box>

          {/* mobile main logo  */}
          <Box
            display={{ xs: "flex", sm: "none" }}
            sx={{ justifyContent: "center", fontSize: "10px", gap: "10px" }}
          >
            <MenuIcon onClick={() => setHamburger(true)} />
            <Link to="/">
              <h1 className="mobile-logo">UnlockDiscounts</h1>
            </Link>
          </Box>

          {/* desktop nav section  */}
          <Box
            display={{ xs: "none", sm: "flex" }}
            sx={{
              fontSize: { xs: "5px", sm: "20px" },
              gap: { xs: "8px", sm: "35px" },
              fontWeight: { xs: "500", sm: "600" },
              justifyContent: "center",
            }}
          >
            {/* men desktop nav  */}
            <span className="link-container">
              <Link onMouseEnter={() => handleDropDown("men")}>MEN </Link>
              <span
                className={navSelection === "men" ? "link-underline" : ""}
              ></span>
            </span>
            {/* men desktop dropdown */}
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
                  <Link className="red-heading">Topwear</Link>
                  {men.topWear.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
                  <span className="black-horizantal-line"></span>
                  <Link className="red-heading">Indian & Festive Wear</Link>
                  {men.indianFestivalWear.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
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
                  {men.bottomWear.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
                  <span className="black-horizantal-line"></span>

                  <Link className="red-heading">Innerwear & Sleepwear</Link>
                  {men.innerWear.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
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
                  {men.footwear.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
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
                  {men.sports.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
                  <span className="black-horizantal-line"></span>

                  <Link className="red-heading">Gadgets</Link>
                  {men.gadgets.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
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
                  {men.fashionAccessories.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}

                  <span className="black-horizantal-line"></span>

                  <Link className="red-heading">Bags & Backpacks</Link>
                  <Link className="red-heading">Luggages & Trolleys</Link>
                </Box>
              </Box>
            )}
            {/* women desktop nav  */}
            <span className="link-container">
              <Link onMouseEnter={() => handleDropDown("women")}>WOMEN</Link>

              <span
                className={navSelection === "women" ? "link-underline" : ""}
              ></span>
            </span>
            {/* women desktop dropdown  */}
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
                  {women.indianFusionWear.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}

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
                  {women.westernWear.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}

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

                  {women.Footwear.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
                  <span className="black-horizantal-line"></span>
                  <Link className="pink-heading">Sports & Active Wear</Link>
                  {women.sports.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
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
                  {women.lingerieAndSleepWear.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
                  <span className="black-horizantal-line"></span>

                  <Link className="pink-heading">Beauty & Personal Care</Link>
                  {women.beautyAndPersonalCare.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
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
                  {women.gadgets.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
                  <span className="black-horizantal-line"></span>

                  <Link className="pink-heading">Jewellery</Link>
                  {women.jewellery.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}

                  <span className="black-horizantal-line"></span>

                  <Link className="pink-heading">Backpacks</Link>
                  <Link className="pink-heading">Handbags, Bags & Wallets</Link>
                  <Link className="pink-heading">Luggages & Trolleys</Link>
                </Box>
              </Box>
            )}
            {/* kids desktop nav  */}
            <span className="link-container">
              <Link onMouseEnter={() => handleDropDown("kids")}>KIDS</Link>

              <span
                className={navSelection === "kids" ? "link-underline" : ""}
              ></span>
            </span>
            {/* kids desktop dropdown  */}
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
                  {kids.boysClothing.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
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
                  {kids.girlsClothing.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
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
                  {kids.footwear.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
                  <span className="black-horizantal-line"></span>

                  <Link className="orange-heading">Toys & Games</Link>
                  {kids.toysAndGames.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
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
                  {kids.infants.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
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
                  {kids.kidsAccessories.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
                  <span className="black-horizantal-line"></span>

                  <Link className="orange-heading">Brands</Link>
                  {kids.brands.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
                </Box>
              </Box>
            )}
            {/* home & living desktop nav  */}
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
            {/* home & living desktop drop down  */}
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
                  {home.bedLinen.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
                  <span className="black-horizantal-line"></span>
                  <Link className="yellow-heading">Flooring</Link>
                  {home.flooring.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
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
                  {home.bath.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
                  <span className="black-horizantal-line"></span>

                  <Link className="yellow-heading">Lamps & Lighting</Link>
                  {home.lamps.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
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
                  {home.homeDecor.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
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
                  {home.kitchen.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
                  <span className="black-horizantal-line"></span>
                  <Link className="yellow-heading">Storage</Link>
                  {home.storage.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
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
                  {home.brands.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
                </Box>
              </Box>
            )}
            {/* beauty desktop nav  */}
            <span className="link-container">
              <Link onMouseEnter={() => handleDropDown("beauty")}>BEAUTY</Link>

              <span
                className={navSelection === "beauty" ? "link-underline" : ""}
              ></span>
            </span>
            {/* beauty desktop dropdown  */}
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
                  {beauty.makeup.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
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
                  {beauty.skincare.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
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
                  {beauty.hairCare.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
                  <span className="black-horizantal-line"></span>
                  <Link className="green-heading">Fragrances</Link>
                  {beauty.fragrence.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
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
                  {beauty.appliances.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
                  <span className="black-horizantal-line"></span>

                  <Link className="green-heading">Men's Grooming</Link>
                  {beauty.mensGrooming.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
                  <span className="black-horizantal-line"></span>
                  <Link className="green-heading">
                    Beauty Gift & Makeup Set
                  </Link>
                  {beauty.beautyGift.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
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

                  {beauty.topBrands.map((link, index) => {
                    return (
                      <Link key={index} to={link[0]}>
                        {link[1]}
                      </Link>
                    );
                  })}
                </Box>
              </Box>
            )}
            {/* online learning desktop nav  */}
            <Link
              onMouseEnter={() => handleDropDown(null)}
              to="/distancelearning"
            >
              ONLINE LEARNING
            </Link>
          </Box>
          {/* search bar for both desktop & mobile  */}
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