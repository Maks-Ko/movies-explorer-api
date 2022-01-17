module.exports.regularExpressionUrl = /^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;

// коды ответов
module.exports.created = 201;
module.exports.badRequest = 400;
module.exports.unauthorized = 401;
module.exports.forbidden = 403;
module.exports.notFound = 404;
module.exports.conflict = 409;

// сообщения ответов
module.exports.userWithEmailExists = 'Пользователь с таким email уже существует';
module.exports.incorrectData = 'Переданы некорректные данные';
module.exports.incorrectDataUser = 'Неправильные почта или пароль';
module.exports.objectNotFound = 'Объект не найден';
module.exports.noRights = 'Запрещено, нет прав';
module.exports.requiredAuth = 'Необходима авторизация';
module.exports.serverError = 'На сервере произошла ошибка';
module.exports.pageNotFound = 'Запрашиваемая страница не найдена';
module.exports.incorrectLink = 'Неправильный формат ссылки';
module.exports.incorrectEmail = 'Неправильный формат почты';
