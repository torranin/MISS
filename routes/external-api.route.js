module.exports = (app) => {
  app.get("/api/external-api/get-patient/:an", async (req, res) => {
    const an = req.params.an;

    // URL
    const url = `http://192.168.1.11:5678/api/an?an=${an}`;
    
    // API Key
    const apiKey = "F9kXzqA4n7Vt2LpHRy5uQmTcJD3eWBiGZxN6Y0avUsKRMohCgE";

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authen': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          an: an
        })
      });
      
      const data = await response.json();

      if (data.length > 0) {
        res.json(data[0]);
      } else {
        res.status(404).json({ error: "ไม่พบข้อมูลผู้ป่วย" });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ 
        error: "เกิดข้อผิดพลาดในการเรียกข้อมูลจากระบบภายนอก",
        message: error.message 
      });
    }
  });
};
