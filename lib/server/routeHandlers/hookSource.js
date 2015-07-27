var hook = require('../../resources/hook');

module['exports'] = function handleHookSource (req, res) {
  if (typeof req.params.subhook !== "undefined" && req.params.subhook.length) {
    req.params.hook = req.params.hook + "/" + req.params.subhook;
  }
  return hook.find({owner: req.params.owner, name: req.params.hook }, function (err, result){
    if (err) {
      return res.end(err.message);
    }
    if (result.length === 0) {
      return res.end('Not found');
    }
    var h = result[0];
    req.hook = h;
    hook.fetchHookSourceCodeFromGithub({ gist: h.gist, req: req, res: res }, function(err, code){
      if (err) {
        return res.end(err.message);
      }
      return res.end(code)
    });
  });
}