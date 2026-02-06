// Import axios
const axios = require("axios");

// Import Model
const Agency = require("../models/agency.model");


exports.createAgency = async (req, res) => {
  const payload = req.body;
  const agency = new Agency({
    agency_name: payload.agency_name,
    agency_description: payload.agency_description,
    // agency_status: payload.agency_status,
  });

  agency.save().then((agency) => {
    res.status(200).json({
      status: "success",
    });
  });
};


exports.getAgencyReport  = async (req, res) => {
  const agencies = await Agency.find({ deleted_at: null });
  res.status(200).json({
    status: "success",
    agencies: agencies,
  });
};


exports.getAgencyById = async (req, res) => {
  const agencyId = req.params.agencyId;
  const agency = await Agency.findById(agencyId);
  res.status(200).json({
    status: "success",
    agency: agency,
  });
};


exports.updateAgency = async (req, res) => {
  const agencyId = req.params.agencyId;
  const payload = req.body;
  const agency = await Agency.findById(agencyId);
  agency.agency_name = payload.agency_name;
  agency.agency_description = payload.agency_description;
  await agency.save();
  res.status(200).json({
    status: "success",
    agency: agency,
  });
};

exports.deleteAgency = async (req, res) => {
  const agencyId = req.params.agencyId;
  const agency = await Agency.findById(agencyId);
  agency.deleted_at = new Date();
  await agency.save();
  res.status(200).json({
    status: "success",
    agency: agency,
  });
};