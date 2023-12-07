const currentDate = new Date();
const currentDateOnly = new Date(currentDate.toISOString().split("T")[0]);


module.exports = {
    currentDateOnly
}