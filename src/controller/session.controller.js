const { COOKIE_USER } = require("../config/config");
const { logger } = require("../config/config.winston");
const { DtoUsers} = require("../dao/DTOs/dtoUsers");
const { sesionServices } = require("../service");
const mailingService = require("../service/mailing.service");
const { generateToken, getUserByToken } = require("../utils/jwt");
const { comparePassword, hashPassword } = require("../utils/hashPassword");
const moment = require("moment/moment");
const DTOsUser = require("../dao/DTOs/dtoUser");


const getUsers = async (req, res) => {
  try {
    const users = await sesionServices.getUsers();
    const dtoUsers = DtoUsers(users);
    if (!users) {
      return res.json({
        status: "error",
        mgs: `No hay Usarios`,
      });
    }
    return res.json({
      status: "Sucess",
      payload: dtoUsers,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: "Error Inesperado",
      error: error,
    });
  }
};

const deleteUserInactive = async (req, res) => {
  try {
    const arrayDelete = [];
    const users = await sesionServices.getUsers();
    if (!users)
      return res.json({
        status: "error",
        message: `Usuarios no encontrado`,
      });

    users.forEach((user) => {
      const expirationTime = moment().subtract(2, "days");
      let userDate = moment(user.last_connection, "DD/MM/YYYY, hh:mm:ss");
      const diff = userDate.isBefore(expirationTime);
      if (diff) {
        mailingService.sendMail({
          to: user.email,
          subject: `Cuenta ELiminada`,
          html: `<p>Hola: ${user.firstName} su cuenta fue eliminada por falta de Incatividad en los ultimos 2 dias, contactar con administrador</p>" `,
        });
        arrayDelete.push(user.id);
      }
    });

    if (arrayDelete.length === 0) {
      return res.json({
        status: "error",
        message: `No hay Usuarios Inactivos para eliminar`,
      });
    } else {
      arrayDelete.forEach(async (id) => {
        await sesionServices.deleteUser(id);
      });
      return res.json({
        status: "success",
        message: `se eliminaron ${arrayDelete.length} Usuarios Inactivos`,
      });
    }
  } catch (error) {
    return res.json({
      status: "error",
      message: `Error Inesperado`,
    });
  }
};

const sessionLogin = async (req, res) => {
  
  if (!req.user.user){
   return res
     .json({
      status:'error',
      message:"Email o Passwor incorrectos",
     });
  }
  logger.info("Usurio logeado correctamente");
 const {user}= req.user
  const dtoUser = new DTOsUser(user) 
  user.last_connection = new Date();
  await sesionServices.updateUser(user._id, user);
  
  res.cookie(COOKIE_USER, req.user.token,
       { maxAge: 1000*60*60*24,
       httpOnly: true,
       sameSite:"None",
       secure:true,
       
      })
     .json({
      status:'success',
      message:"Usuario Logeado con exito",
      user:dtoUser,
      token:req.user.token});
    
};

const loginRegister = (req, res) => {
  logger.info("cliente Registrado con exito");
  res.send(req.user);
};

const getCurrent = (req, res) => {
  newUser = DtoUser(req.user);
  res.send(newUser);
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const verifyUser = await sesionServices.getEmail({ email: email });
    if (verifyUser === null) {
      return res.json({
        status: "error",
        message: `El email no encontrado`,
      });
    }
    const token = generateToken({ id: verifyUser._id }, "1h");
    mailingService.sendMail({
      to: verifyUser.email,
      subject: ` Hola ${verifyUser.firstName}`,
      html: `<a href="http://localhost:8080/forgotrecovery/?token=${token}" style="margin: 20px 0; color: #080808;">Restablecer Constraseña</a>`,
    });
    res.json({
      status: "success",
      message: `Se Envio email a ${verifyUser.email} para restablecer su Contraseña`,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error Inesperado",
      error: error,
    });
  }
};

const forgotrecovery = async (req, res, next) => {
  try {
    const newPassword = req.body.password;
    const token = req.params.token;
    if (!newPassword || !token) {
      return res.status(400).json({
        status: "error",
        message: "Invalid data",
      });
    }
    const user = await getUserByToken(token);
    if (!user) {
      return res.status(403).json({
        status: "error",
        message: "Token Invalido",
      });
    }
    const isValid = await comparePassword(newPassword, user.password);
    if (isValid) {
      return res.status(403).json({
        status: "error",
        message: "La contraseña no puede ser igual a la anterior",
      });
    }
    user.password = await hashPassword(newPassword);
    await sesionServices.updateUser(user.id, user);
    return res.status(200).json({
      status: "Susses",
      message: "La contraseña se actualizo con exito",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error Inesperado",
      error: error,
    });
  }
};
const roleChange = async (req, res, next) => {
  const { uid } = req.params;
  const { rol } = req.body;
  const user = await sesionServices.getUserId(uid);
  const documents = user.documents;
  if (!user) {
    return res.status(200).json({
      status: "error",
      message: "Usuario no Encontrado",
    });
  }
  if (user.rol === rol) {
    return res.status(200).json({
      status: "error",
      message: `El usuario ya tiene role ${rol}`,
    });
  }
  const array = documents.filter((element) =>
    TYPE_DOCUMENTS.includes(element.name)
  );

  if (array.length < 3) {
    return res
      .status(403)
      .json({
        status: "error",
        msg: "Para ser usuario premium debe subir la documentacion necesaria",
      });
  }
  await sesionServices.updateUserRole(user.id, rol);
  return res.status(200).json({
    status: "Susses",
    message: "El Role Cambiado con exito",
  });
};
const uploadDocuments = async (req, res) => {
  try {
    let { user } = req.user;

    let userDocuments = [];
    user.documents.forEach((element) => {
      userDocuments.push(element.name);
    });
    await sesionServices.updateUserDoc(user.id, {
      documents: [
        ...user.documents,
        {
          name: req.body.typeDocument,
          reference: req.route,
        },
      ],
    });
    res.send({ status: "sucsses", msg: "Archivo Guardado con exito" });
  } catch (error) {
   
    res.send({ status: "error", msg: "Error inesperado" });
  }
};

const logout = (req, res)=>{
  res.clearCookie(COOKIE_USER)
  res.json({
  status: "success",
  message: "Sesion Cerrada",
  })


 }

module.exports = {
  sessionLogin,
  loginRegister,
  getCurrent,
  forgotPassword,
  forgotrecovery,
  roleChange,
  uploadDocuments,
  getUsers,
  deleteUserInactive,
  logout
};
