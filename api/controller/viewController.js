exports.getHomePage = async function (req, res, next) {
  try {
    res.status(200).render("login");
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getOverviewPage = async function (req, res, next) {
  try {
    res.status(200).render("index");
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
