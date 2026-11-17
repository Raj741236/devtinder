const validateUserEditFieldData = (req) => {
  const ALLOWED_EDIT_FIELDS = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "about",
    "skills",
    "age",
    "gender",
    "about",
  ];

  const isUserEditAllowed = Object.keys(req.body).every((field) =>
    ALLOWED_EDIT_FIELDS.includes(field),
  );

  return isUserEditAllowed;
};

module.exports = {
  validateUserEditFieldData,
};
