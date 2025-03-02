const express = require("express");
 const {
   getAllSeries, getSeries, updateSeries, archiveSeries, deleteSeriesPermanently
 } = require("../controllers/series.controller");

const router = express.Router();

router.get('/', getAllSeries)
router.get('/:id', getSeries)
router.put('/updateSeries/:id', updateSeries)
router.put('/updateBooks/:id',archiveSeries )
router.delete("/delete/:id", deleteSeriesPermanently)


module.exports = router