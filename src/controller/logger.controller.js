const loggerTest =(req,res)=>{
   req.logger.fatal('Logger Fatal');
  req.logger.error('Logger Error');
  req.logger.warning('Logger Warn');
  req.logger.info('Logger Info');
  req.logger.http('Logger Http');
  req.logger.debug('Logger Debug');
  res.json({msg:'logger Test'});
}
module.exports = loggerTest