localStorage.setItem("list", JSON.stringify([{name: "good 1"}]));

const good = {
    name: "good 2",
};
const newList = JSON.parse(localStorage.getItem("list")).concat(good);
localStorage.setItem("list", JSON.stringify(newList));

const newList2 = JSON.parse(localStorage.getItem("list")).filter(
    (el) => el.name !== "good 1"
);
localStorage.setItem("list", JSON.stringify(newList2));