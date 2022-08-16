let item = document.querySelector("div.items");
let cartItemsHolder = document.querySelector(".cart-items-holder");
const totalPrice = document.querySelector(".cart-results-price-size");
let iconCartBefore = document.querySelector(".icon-cart-before");

function createModal(
  imgUrl,
  name,
  height,
  width,
  depth,
  weight,
  reviews,
  price,
  inStock,
  color,
  os,
  color,
  chip
) {
  popup.style.display = "block";
  popupImg = document.querySelector("img.popup-img");
  popupImg.setAttribute("src", imgUrl);

  popupDescribeDivTitle = document.querySelector("h2.describe-title");
  popupDescribeDivTitle.innerHTML = name;

  let describeItemsColor = document.querySelector(".describeItemsColor");
  describeItemsColor.innerHTML = color.join(", ");
  let describeItemsOS = document.querySelector(".describeItemsOS");
  describeItemsOS.innerHTML = os;
  let describeItemsChip = document.querySelector(".describeItemsChip");
  describeItemsChip.innerHTML = chip;
  let describeItemsHeight = document.querySelector(".describeItemsHeight");
  describeItemsHeight.innerHTML = `${height} cm`;
  let describeItemsWidth = document.querySelector(".describeItemsWidth");
  describeItemsWidth.innerHTML = `${width} cm`;
  let describeItemsDepth = document.querySelector(".describeItemsDepth");
  describeItemsDepth.innerHTML = `${depth} cm`;
  let describeItemsWeigth = document.querySelector(".describeItemsWeigth");
  describeItemsWeigth.innerHTML = `${weight} cm`;

  let spanDiv = document.querySelector(".spanDiv");
  spanDiv.innerHTML = `${reviews} %`;

  priceTitleInPopupPriceDiv = document.querySelector("h2.price-title");
  priceTitleInPopupPriceDiv.innerHTML = `$ ${price}`;
  priceStockInPopupPriceDiv = document.querySelector("div.price-stock");
  priceStockInPopupPriceDiv.innerHTML = `Stock: ${inStock} pcs.`;
  let cardPopupBut = document.querySelector(".card-popup-but");
  if (inStock == 0) {
    cardPopupBut.classList.remove("but_add");
    cardPopupBut.classList.add("but_disabled");
  } else {
    cardPopupBut.classList.remove("but_disabled");
    cardPopupBut.classList.add("but_add");
    function localFunction() {
      addToCart(imgUrl, name, price);
    }
    cardPopupBut.addEventListener("click", localFunction, { once: true });
  }
}

function addToCart(imgUrl, name, price) {
  if (iconCartBefore.innerHTML == "") {
    iconCartBefore.innerHTML = 1;
    iconCartBefore.style.display = "inline";
  } else {
    iconCartBefore.innerHTML = Number(iconCartBefore.innerHTML) + 1;
  }

  let mainCartPopupHolder = document.createElement("div");
  mainCartPopupHolder.classList.add("mainCartPopupHolder");
  let productDiv = document.createElement("div");
  productDiv.classList.add("productDiv");
  let productImgDiv = document.createElement("div");
  productImgDiv.classList.add("productImgDiv");
  let productImg = document.createElement("img");
  productImg.classList.add("productImg");
  let productNameDiv = document.createElement("div");
  productNameDiv.classList.add("productNameDiv");
  let productNameDivTitle = document.createElement("h2");
  productNameDivTitle.classList.add("productNameDivTitle");
  let productNameDivSpan = document.createElement("span");
  productNameDivSpan.classList.add("productNameDivSpan");
  productImg.setAttribute("src", imgUrl);
  productNameDivTitle.innerHTML = name;
  productNameDivSpan.innerHTML = `$${price}`;

  productNameDiv.append(productNameDivTitle, productNameDivSpan);
  productImgDiv.append(productImg);
  productDiv.append(productImgDiv, productNameDiv);

  let countDiv = document.createElement("div");
  countDiv.classList.add("countDiv");
  let countDivLeftArrow = document.createElement("span");
  countDivLeftArrow.classList.add("countDivLeftArrow", "icon-arrow_left");
  let countDivCounter = document.createElement("span");
  countDivCounter.classList.add("countDivCounter");
  let countDivRightArrow = document.createElement("span");
  countDivRightArrow.classList.add("countDivRightArrow", "icon-arrow_left");
  let countDivCloser = document.createElement("span");
  countDivCloser.classList.add("countDivCloser");
  countDivCounter.innerHTML = 1;
  countDivCloser.innerHTML = "X";

  countDiv.append(
    countDivLeftArrow,
    countDivCounter,
    countDivRightArrow,
    countDivCloser
  );

  const totalAmount = document.querySelector(".cart-results-amount-size");
  totalAmount.innerHTML =
    Number(countDivCounter.innerHTML) + Number(totalAmount.innerHTML);
  countDivLeftArrow.addEventListener("click", function (e) {
    if (countDivCounter.innerHTML != 1) {
      countDivCounter.innerHTML--;
      totalPrice.innerHTML = Number(totalPrice.innerHTML) - price;
      totalAmount.innerHTML--;
    }
  });

  countDivRightArrow.addEventListener("click", function () {
    if (countDivCounter.innerHTML != 4) {
      countDivCounter.innerHTML++;
      totalPrice.innerHTML = Number(totalPrice.innerHTML) + price;
      totalAmount.innerHTML++;
    }
  });

  mainCartPopupHolder.append(productDiv, countDiv);
  cartItemsHolder.append(mainCartPopupHolder);
  countDivCloser.addEventListener("click", function (e) {
    mainCartPopupHolder.remove();
    totalPrice.innerHTML =
      Number(totalPrice.innerHTML) - price * countDivCounter.innerHTML;
    totalAmount.innerHTML = totalAmount.innerHTML - countDivCounter.innerHTML;
    if (iconCartBefore.innerHTML == 1) {
      iconCartBefore.innerHTML = "";
      iconCartBefore.style.display = "none";
    } else {
      iconCartBefore.innerHTML = Number(iconCartBefore.innerHTML) - 1;
    }
  });

  totalPrice.innerHTML = price + Number(totalPrice.innerHTML);
}

const iconCart = document.querySelector(".icon-cart");
const cartPopup = document.querySelector(".popup--cart");
iconCart.addEventListener("click", function () {
  if (isHidden(cartPopup)) {
    cartPopup.style.display = "block";
    iconCart.style.color = "#bcbcbc";
    iconCart.style.borderColor = "#bcbcbc";
  } else {
    cartPopup.style.display = "none";
    iconCart.style.color = "#767272";
    iconCart.style.borderColor = "#767272";
  }
});

function adder(name, stockIn, imgUrl, priceIn, looks, id) {
  let div = document.createElement("div");
  div.classList.add("card", `card-number-${id}`);
  let span = document.createElement("span");
  span.classList.add("icon-like_empty");
  let img = document.createElement("img");
  img.classList.add("card-img");
  let h3 = document.createElement("h3");
  h3.classList.add("card-title");
  h3.innerHTML = name;
  let stock = document.createElement("div");
  stock.classList.add("stock");
  let add = document.createElement("button");
  add.innerHTML = "Add to cart";
  if (stockIn == 0) {
    let cross = document.createElement("span");
    cross.classList.add("icon-close");
    let left = document.createElement("span");
    left.classList.add("left");
    left.innerHTML = " " + stockIn + " left in stock";
    stock.append(cross, left);
    add.classList.add("but_disabled");
  } else {
    let noCross = document.createElement("span");
    noCross.classList.add("icon-check");
    let left = document.createElement("span");
    left.classList.add("left");
    left.innerHTML = " " + stockIn + " left in stock";
    stock.append(noCross, left);
    add.classList.add("but_add");

    add.addEventListener("click", function () {
      addToCart(imgUrl, name, priceIn);
    });
  }
  let price = document.createElement("div");
  price.classList.add("price");
  price.innerHTML = "Price: " + priceIn + " $";
  img.setAttribute("src", imgUrl);

  let greyDiv = document.createElement("div");
  greyDiv.classList.add("grey");
  let firstDiv = document.createElement("div");
  firstDiv.classList.add("first");
  let secondDiv = document.createElement("div");
  secondDiv.classList.add("second");
  let icon_span = document.createElement("span");
  icon_span.classList.add("icon-like_filled");
  let divInDiv = document.createElement("div");
  divInDiv.classList.add("leftSide");
  let secondfirstDiv = document.createElement("div");
  secondfirstDiv.classList.add("firstSecond");
  let secondsecondDiv = document.createElement("div");
  secondsecondDiv.classList.add("secondSecond");
  secondfirstDiv.innerHTML = "1000";
  secondsecondDiv.innerHTML = "Orders";

  let firstfirstDiv = document.createElement("div");
  firstfirstDiv.classList.add("firstFirst");
  let firstsecondDiv = document.createElement("div");
  firstsecondDiv.classList.add("secondFirst");
  let spanDiv = document.createElement("span");
  spanDiv.classList.add("spanDiv");
  spanDiv.innerHTML = looks + "%";
  firstfirstDiv.innerHTML = "  " + "Positive reviews";
  firstsecondDiv.innerHTML = "Above average";

  let iconLikeEmptyClicker = 0;
  span.addEventListener("click", function (e) {
    if (iconLikeEmptyClicker == 0) {
      popup.style.display = "none";
      span.style.color = "blue";
      iconLikeEmptyClicker = 1;
    } else {
      popup.style.display = "none";
      span.style.color = "black";
      iconLikeEmptyClicker = 0;
    }
  });

  firstfirstDiv.append(spanDiv);
  firstfirstDiv.prepend(spanDiv);
  divInDiv.append(firstfirstDiv, firstsecondDiv);

  secondDiv.append(secondfirstDiv, secondsecondDiv);
  firstDiv.append(icon_span, divInDiv);
  greyDiv.append(firstDiv, secondDiv);

  div.append(span, img, h3, stock, price, add, greyDiv);
  item.append(div);
}

for (let i of items) {
  adder(
    i.name,
    i.orderInfo.inStock,
    i.imgUrl,
    i.price,
    i.orderInfo.reviews,
    i.id
  );
}

const popup = document.querySelector(".popup");
const popupDescribeDiv = document.querySelector("div.popup-describe-div");

for (let i of items) {
  let ourCard = document.querySelector(`.card-number-${i.id}`);
  ourCard.addEventListener("click", function (e) {
    let currentCardNumber = document.querySelector(`.card-number-${i.id} span`);
    let but_add = document.querySelector(`.card-number-${i.id} button`);
    if (e.target == currentCardNumber) {
      console.log("liked");
    } else if (e.target == but_add) {
      console.log("added");
    } else if (e) {
      createModal(
        i.imgUrl,
        i.name,
        i.size.height,
        i.size.width,
        i.size.depth,
        i.size.weight,
        i.orderInfo.reviews,
        i.price,
        i.orderInfo.inStock,
        i.color,
        i.os,
        i.color
      );
    }
  });
}

const popupBody = document.querySelector(".popupBody");
popup.addEventListener("click", function (e) {
  if (e.target == popupBody) {
    popup.style.display = "none";
  }
});

const inputFinder = document.querySelector(".input-finder");
const searchBut = document.querySelector(".search-but");
inputFinder.addEventListener("change", function (e) {
  for (let i of items) {
    let nameToLowerCase = i.name.toLowerCase();
    let inputValueToLowerCase = inputFinder.value.toLowerCase();
    if (nameToLowerCase.includes(inputValueToLowerCase)) {
      let deletedCard = document.querySelector(`.card-number-${i.id}`);
      deletedCard.style.display = "block";
    } else {
      let deletedCard = document.querySelector(`.card-number-${i.id}`);
      deletedCard.style.display = "none";
    }
  }
});

const filterPriceWrap = document.querySelector(".filter-price-wrapper");
const secondLevelPrice = document.querySelector(".secondLevelOfPrice");
const arrow = document.querySelector(".price-arrow");
let a = 0;
filterPriceWrap.addEventListener("click", function () {
  if (a == 0) {
    filterPriceWrap.style.backgroundColor = "#FFFFFF";
    arrow.style.transform = "rotate(90deg)";
    secondLevelPrice.classList.add(
      "secondLevelPriceClicked",
      "secondLevelClicked"
    );
    a = 1;
  } else {
    filterPriceWrap.style.backgroundColor = "#EDF3FF";
    arrow.style.transform = "rotate(0deg)";
    secondLevelPrice.classList.remove(
      "secondLevelPriceClicked",
      "secondLevelClicked"
    );
    a = 0;
  }
});

const filterColorWrap = document.querySelector(".filter-price-color");
const secondLevelColor = document.querySelector(".secondLevelOfColor");
const colorArrow = document.querySelector(".color-arrow");
let b = 0;

filterColorWrap.addEventListener("click", function () {
  if (b == 0) {
    filterColorWrap.style.backgroundColor = "#FFFFFF";
    colorArrow.style.transform = "rotate(90deg)";
    secondLevelColor.classList.add(
      "secondLevelColorClicked",
      "secondLevelClicked"
    );
    b = 1;
  } else {
    filterColorWrap.style.backgroundColor = "#EDF3FF";
    colorArrow.style.transform = "rotate(0deg)";
    secondLevelColor.classList.remove(
      "secondLevelColorClicked",
      "secondLevelClicked"
    );
    b = 0;
  }
});

const filterMemoryWrap = document.querySelector(".filter-memory-wrapper");
const secondLevelMemory = document.querySelector(".secondLevelOfMemory");
const memoryArrow = document.querySelector(".memory-arrow");
let c = 0;
filterMemoryWrap.addEventListener("click", function () {
  if (c == 0) {
    filterMemoryWrap.style.backgroundColor = "#FFFFFF";
    memoryArrow.style.transform = "rotate(90deg)";
    secondLevelMemory.classList.add(
      "secondLevelMemoryClicked",
      "secondLevelClicked"
    );
    c = 1;
  } else {
    filterMemoryWrap.style.backgroundColor = "#EDF3FF";
    memoryArrow.style.transform = "rotate(0deg)";
    secondLevelMemory.classList.remove(
      "secondLevelMemoryClicked",
      "secondLevelClicked"
    );
    c = 0;
  }
});

const filterOsWrap = document.querySelector(".filter-os-wrapper");
const secondLevelOs = document.querySelector(".secondLevelOfOs");
const osArrow = document.querySelector(".os-arrow");
let d = 0;
filterOsWrap.addEventListener("click", function () {
  if (d == 0) {
    filterOsWrap.style.backgroundColor = "#FFFFFF";
    osArrow.style.transform = "rotate(90deg)";
    secondLevelOs.classList.add("secondLevelOsClicked", "secondLevelClicked");
    d = 1;
  } else {
    filterOsWrap.style.backgroundColor = "#EDF3FF";
    osArrow.style.transform = "rotate(0deg)";
    secondLevelOs.classList.remove(
      "secondLevelOsClicked",
      "secondLevelClicked"
    );
    d = 0;
  }
});

const filterDisplayWrap = document.querySelector(".filter-display-wrapper");
const secondLevelDisplay = document.querySelector(".secondLevelOfDisplay");
const displayArrow = document.querySelector(".display-arrow");
let e = 0;
filterDisplayWrap.addEventListener("click", function () {
  if (e == 0) {
    filterDisplayWrap.style.backgroundColor = "#FFFFFF";
    displayArrow.style.transform = "rotate(90deg)";
    secondLevelDisplay.classList.add(
      "secondLevelDisplayClicked",
      "secondLevelClicked"
    );
    e = 1;
  } else {
    filterDisplayWrap.style.backgroundColor = "#EDF3FF";
    displayArrow.style.transform = "rotate(0deg)";
    secondLevelDisplay.classList.remove(
      "secondLevelDisplayClicked",
      "secondLevelClicked"
    );
    e = 0;
  }
});

let maxPrice = items[0].price;
let minPrice = items[0].price;
let itemsColorsArr = [];
let itemsStorsgeArr = [];
for (let j = 0; j < items.length; j++) {
  if (items[j].price > maxPrice) {
    maxPrice = items[j].price;
  } else if (items[j].price < minPrice) {
    minPrice = items[j].price;
  }

  if (!itemsStorsgeArr.includes(items[j].storage)) {
    itemsStorsgeArr.push(items[j].storage);
  }

  for (let i of items[j].color) {
    if (!itemsColorsArr.includes(i)) {
      itemsColorsArr.push(i);
    }
  }
}

for (let i of itemsColorsArr) {
  let secondLevelOfColorUl = document.querySelector(".secondLevelOfColor");
  let secondLevelItem = document.createElement("li");
  secondLevelItem.classList.add("secondLevelItem", "secondLevelItemOfColor");
  let checkLabel = document.createElement("label");
  checkLabel.classList.add("check-label", "option");
  let secondLevelCheck = document.createElement("input");
  secondLevelCheck.setAttribute("type", "checkbox");
  secondLevelCheck.setAttribute("value", i);
  secondLevelCheck.classList.add(
    "secondLevelCheck",
    "secondLevelCheckForColor",
    `${i.replace(" ", "-")}`
  );
  let secondLevelItemCheckSpan = document.createElement("span");
  secondLevelItemCheckSpan.classList.add("secondLevelItem--checkSpan");
  let secondLevelSpan = document.createElement("span");
  secondLevelSpan.classList.add("secondLevelSpan");
  secondLevelSpan.innerHTML = i;
  let divForLeftColumnColors = document.querySelector(
    ".divForLeftColumnColors"
  );
  let divForRightColumnColors = document.querySelector(
    ".divForRightColumnColors"
  );
  checkLabel.append(secondLevelCheck, secondLevelItemCheckSpan);
  secondLevelItem.append(checkLabel, secondLevelSpan);
  if (itemsColorsArr.indexOf(i) % 2 == 1) {
    divForLeftColumnColors.append(secondLevelItem);
    secondLevelOfColorUl.append(divForLeftColumnColors);
  } else {
    divForRightColumnColors.append(secondLevelItem);
  }
}

for (let i of itemsStorsgeArr) {
  if (i == null) {
    continue;
  }
  let secondLevelOfStorage = document.querySelector(".secondLevelOfMemory");
  let secondLevelItem = document.createElement("li");
  secondLevelItem.classList.add("secondLevelItem", "secondLevelItemOfColor");
  let checkLabel = document.createElement("label");
  checkLabel.classList.add("check-label", "option");
  let secondLevelCheck = document.createElement("input");
  secondLevelCheck.setAttribute("type", "checkbox");
  secondLevelCheck.setAttribute("value", i);
  secondLevelCheck.classList.add("secondLevelCheck");
  let secondLevelItemCheckSpan = document.createElement("span");
  secondLevelItemCheckSpan.classList.add("secondLevelItem--checkSpan");
  let secondLevelSpan = document.createElement("span");
  secondLevelSpan.classList.add("secondLevelSpan");
  secondLevelSpan.innerHTML = `${i.toFixed(0)} Gb`;
  checkLabel.append(secondLevelCheck, secondLevelItemCheckSpan);
  secondLevelItem.append(checkLabel, secondLevelSpan);
  secondLevelOfStorage.append(secondLevelItem);
}

const settingsPopup = document.querySelector(".popup--settings-but");
const settingsButton = document.querySelector(".settings-but");
const filterPopup = document.querySelector(".popup--filter-but");
const filterButton = document.querySelector(".filter-but");

function isHidden(el) {
  const style = window.getComputedStyle(el);
  return style.display === "none";
}

settingsButton.addEventListener("click", function () {
  if (isHidden(settingsPopup)) {
    settingsPopup.style.display = "block";
    settingsButton.style.backgroundColor = "#102243";
    filterPopup.style.display = "none";
    filterButton.style.backgroundColor = "#0E49B5";
  } else {
    settingsPopup.style.display = "none";
    settingsButton.style.backgroundColor = "#0E49B5";
  }
});
filterButton.addEventListener("click", function () {
  if (isHidden(filterPopup)) {
    filterPopup.style.display = "block";
    filterButton.style.backgroundColor = "#102243";
    settingsPopup.style.display = "none";
    settingsButton.style.backgroundColor = "#0E49B5";
  } else {
    filterPopup.style.display = "none";
    filterButton.style.backgroundColor = "#0E49B5";
  }
});

document.querySelector("#filter-list").addEventListener("input", filterCheck);

function filterCheck() {
  const secondLevelInputFrom = document.querySelector(".secondLevelInputFrom");
  const secondLevelInputTo = document.querySelector(".secondLevelInputTo");
  const dataOfSecondLevelColors = document.querySelector(".secondLevelOfColor");
  const dataOfSecondLevelMemory = document.querySelector(
    ".secondLevelOfMemory"
  );
  const dataOfSecondLevelOs = document.querySelector(".secondLevelOfOs");
  const dataOfSecondLevelDisplay = document.querySelector(
    ".secondLevelOfDisplay"
  );

  const filteredSecondLevelPrice =
    secondLevelInputFrom.value.length > 0 && secondLevelInputTo.value.length > 0
      ? items.filter((i) => {
          if (
            i.price > Number(secondLevelInputFrom.value) &&
            i.price < Number(secondLevelInputTo.value)
          ) {
            return true;
          }
        })
      : items;

  const selectedColors = [
    ...dataOfSecondLevelColors.querySelectorAll(".secondLevelCheck:checked"),
  ].map((n) => n.value);

  const filteredItemsWithColors =
    selectedColors.length > 0
      ? filteredSecondLevelPrice.filter((el) => {
          const intersection = el.color.filter((color) => {
            return selectedColors.includes(color);
          });
          if (intersection.length) {
            return true;
          }
        })
      : filteredSecondLevelPrice;

  const selectedMemory = [
    ...dataOfSecondLevelMemory.querySelectorAll(
      ".secondLevelOfMemory .secondLevelCheck:checked"
    ),
  ].map((n) => Number(n.value));

  const filteredItemsAfterMemory =
    selectedMemory.length > 0
      ? filteredItemsWithColors.filter((el) => {
          return selectedMemory.includes(el.storage);
        })
      : filteredItemsWithColors;

  const selectedOs = [
    ...dataOfSecondLevelOs.querySelectorAll(
      ".secondLevelOfOs .secondLevelCheck:checked"
    ),
  ].map((n) => n.value);

  const filtredItemsAfterOs =
    selectedOs.length > 0
      ? filteredItemsAfterMemory.filter((el) => {
          return selectedOs.includes(el.os);
        })
      : filteredItemsAfterMemory;

  const displayInches = {
    "2-5inch": {
      lowerValue: 2,
      higherValue: 5,
    },
    "5-7inch": {
      lowerValue: 5,
      higherValue: 7,
    },
    "7-12inch": {
      lowerValue: 7,
      higherValue: 12,
    },
    "12-16inch": {
      lowerValue: 12,
      higherValue: 16,
    },
    "16inch": {
      lowerValue: 16,
      higherValue: 20,
    },
  };

  const selectedDisplay = [
    ...dataOfSecondLevelDisplay.querySelectorAll(
      ".secondLevelOfDisplay .secondLevelCheck:checked"
    ),
  ].map((input) => displayInches[input.value]);

  const filtredItemsAfterDisplay =
    selectedDisplay.length > 0
      ? filtredItemsAfterOs.filter((el) => {
          return selectedDisplay.filter((dis) => {
            if (el.display > dis.lowerValue && el.display < dis.higherValue) {
              return true;
            }
          }).length;
        })
      : filtredItemsAfterOs;

  item.innerHTML = null;

  for (let i of filtredItemsAfterDisplay) {
    adder(
      i.name,
      i.orderInfo.inStock,
      i.imgUrl,
      i.price,
      i.orderInfo.reviews,
      i.id
    );
    let ourCard = document.querySelector(`.card-number-${i.id}`);
    ourCard.addEventListener("click", function (e) {
      let currentCardNumber = document.querySelector(
        `.card-number-${i.id} span`
      );
      let but_add = document.querySelector(`.card-number-${i.id} button`);
      if (e.target == currentCardNumber) {
        console.log("liked");
      } else if (e.target == but_add) {
        console.log("added");
      } else if (e) {
        createModal(
          i.imgUrl,
          i.name,
          i.size.height,
          i.size.width,
          i.size.depth,
          i.size.weight,
          i.orderInfo.reviews,
          i.price,
          i.orderInfo.inStock,
          i.color,
          i.os,
          i.color
        );
      }
    });
  }

  inputFinder.addEventListener("change", function (e) {
    for (let i of filtredItemsAfterDisplay) {
      let nameToLowerCase = i.name.toLowerCase();
      let inputValueToLowerCase = inputFinder.value.toLowerCase();
      if (nameToLowerCase.includes(inputValueToLowerCase)) {
        let deletedCard = document.querySelector(`.card-number-${i.id}`);
        deletedCard.style.display = "block";
      } else {
        let deletedCard = document.querySelector(`.card-number-${i.id}`);
        deletedCard.style.display = "none";
      }
    }
  });
}
