window.rate = function (value) {
  localStorage.setItem("userRating", value);
  alert(`You rated this ${value} stars ⭐`);
};
