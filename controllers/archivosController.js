const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

exports.subirArchivo = async (req, res, next) => {
  const configuracionMulter = {
    limits: {
      fileSize: req.usuario === true ? 10000000 : 10000000,
    },
    // eslint-disable-next-line no-undef
    storage: fileStorage = multer.diskStorage({
      destination: (_req, file, cb) => {
        cb(null, `${__dirname}/../uploads`);
      },
      filename: (_req, file, cb) => {
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, `${shortid.generate()}${extension}`);
      },
    }),
  };

  const upload = multer(configuracionMulter).single('archivo');

  upload(req, res, async (error) => {
    console.log('req.file', req.file);
    if (!error) {
      res.json({ archivo: req.file.filename });
      next();
    } else {
      res.json({ error });
      next();
    }
  });
};

exports.eliminarArchivo = async (req, res) => {
  try {
    fs.unlinkSync(`${__dirname}/../uploads/${req.archivo}`);
    res.json({
      ok: true,
      msg: 'Archivo eliminado',
    });
  } catch (error) {
    console.log(error);
  }
};
