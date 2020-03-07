const fs = require("fs");
const data = require("../data.json");
const Intl = require("intl");
const { age, date } = require("../utils");

exports.index = function(req, res){
  return res.render("members/index", { members: data.members })
}

// create
exports.post = function(req, res){
  const keys = Object.keys(req.body)

  for (key of keys){
    if(req.body[key] == ""){
      return res.send("Por favor, preencha todos os campos")
    }
  }

  let {avatar_url, birth, name, gender} = req.body;

  birth = Date.parse(birth);
  const id = Number(data.members.length + 1);

  data.members.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Erro ao escrever o arquivo.");

    return res.redirect("/members");
  });

}

//show
exports.show = function(req,res){
  const { id } = req.params;

  const foundMember = data.members.find(function(member){
    return member.id == id;
  })

  if(!foundMember) return res.send("Aluno não encontrado");

  const member = {
    ... foundMember,
    age: age(foundMember.birth),
  }

  return res.render("members/show", { member });
}

exports.create = function(req,res){
  return res.render("members/create")
}

// edit
exports.edit = function(req, res){
  const { id } = req.params;

  const foundMember = data.members.find(function(member){
    return member.id == id;
  })

  if(!foundMember) return res.send("Aluno não encontrado");

  const member = {
    ...foundMember,
    birth: date(foundMember.birth)
  }

  return res.render('members/edit', {member})
}

// put
exports.put = function(req, res){
  const { id } = req.body;
  let index = 0;

  const foundMember = data.members.find(function(member, foundIndex){
    if(id == member.id){
      index = foundIndex;
      return true;
    }
  })

  if(!foundMember) return res.send("Instrutor não encontrado");

  const member = {
    ... foundMember,
    ... req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.members[index] = member;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("Erro ao salvar")

    return res.redirect(`/members/${id}`);
  })

}

// delete
exports.delete = function(req, res){
  const{ id } = req.body;

  const filteredMembers = data.members.filter(function(member){
    return member.id != id;
  })

  data.members = filteredMembers;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err){
      return res.send("Erro ao salvar o arquivo DATA.json")
    }

    return res.redirect("/members");
  })
}