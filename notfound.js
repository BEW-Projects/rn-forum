const router = require('express').Router();

router.all('*', (req, res) => {
  res.status(404).json({
    message: `Not Found - ${req.originalUrl}`
  });
});

module.exports = router;  
