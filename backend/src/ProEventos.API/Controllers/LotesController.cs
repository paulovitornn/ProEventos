using Microsoft.AspNetCore.Mvc;
using ProEventos.Application.Contratos;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System;
using ProEventos.Application.Dtos;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LotesController : ControllerBase
    {
        private readonly ILotesService _lotesService;

        public LotesController(ILotesService lotesService)  //ILogger<EventoController> logger
        {
            _lotesService = lotesService;
        }

        //get eventos

        [HttpGet("idEvento/{id}")]
        public async Task<IActionResult> Get()
        {
            //return _eventosService.Eventos;
            try
            {
                var lotes = await _lotesService.GetAllLotesByIdEventoAsync(true);
                if (lotes == null) return NoContent(); //NotFound("Nenhum evento foi encontrado.");

                return Ok(lotes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar lotes. Erro:{ex.Message}");
            }
        }

        [HttpPost("adicionarEvento")]
         public async Task<IActionResult> Post(EventoDto model)
        {
            try
            {
                var eventos = await _eventosService.AddEventos(model);
                if (eventos == null) return BadRequest("Erro ao tentar adicionar um novo evento.");

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro desconhecido ao tentar adicionar evento. Erro:{ex.Message}");
            }
        }

        [HttpPut("atualizarEvento/{idEvento}")]
         public async Task<IActionResult> Put(int idEvento, EventoDto model)
        {
            try
            {
                var evento = await _eventosService.UpdateEventos(idEvento, model);
                if (evento == null) return NotFound("Não foi possivel atualizar o evento.");

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro desconhecido ao tentar atualizar evento. Erro:{ex.Message}");
            }
        }

        [HttpDelete("excluirEvento/{idEvento}")]
         public async Task<IActionResult> Delete(int idEvento)
        {
            try
            {
                return await _eventosService.DeleteEventos(idEvento) 
                    ? Ok(new {message = "Deletado"}) 
                    : throw new Exception("Ocorreu um problema não especificado.");
                    //BadRequest("Não foi encontrado o evento a ser excluido.");

                /* forma alternativa para o mesmo resultado.
                if (await _eventosService.DeleteEventos(idEvento)) 
                    return Ok("Evento excluido com sucesso.");
                else
                    return BadRequest("Não foi encontrado o evento a ser excluido.");
                */
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar eventos. Erro:{ex.Message}");
            }
        }
    }
}
