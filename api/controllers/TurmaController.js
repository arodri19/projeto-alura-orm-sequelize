const database = require('../models')

class TurmaController {

    static async pegaTodasAsTurmas(req, res) {
      try {
        const todasAsTurmas = await database.Turmas.findAll()
        return res.status(200).json(todasAsTurmas)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async pegaUmaTurma(req, res) {
        const { id } = req.params

        try {
            const umaTurma = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(umaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaTurma(req, res) {
        const novaTurma = req.body

        try {
            const novaTurmacriada = await database.Turmas.create(novaTurma)
            res.status(201).json(novaTurmacriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaTurma(req, res) {
        const novasInfos = req.body
        const { id } = req.params
        try {
            await database.Turmas.update(
                novasInfos,
                {
                    where: {
                        id: id
                    }
                }
            )
            const turmaAtualizada = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            })
            res.status(200).json(turmaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaTurma(req,res){
        const {id} = req.params

        try{
            await database.Turmas.destroy({
                where:{
                    id: Number(id)
                }
            })

            return res.status(200).json({mensagem: `id ${id} deletado`})
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TurmaController