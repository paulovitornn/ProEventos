using Microsoft.AspNetCore.Mvc;
using ProEventos.Domain;
using ProEventos.Application.Contratos;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {
        private readonly IEventosService _eventosService;

        public EventosController(IEventosService eventosService)  //ILogger<EventoController> logger
        {
            _eventosService = eventosService;
        }

        //get eventos

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //return _eventosService.Eventos;
            try
            {
                var eventos = await _eventosService.GetAllEventosAsync(true);
                if (eventos == null) return NotFound("Nenhum evento foi encontrado.");

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar eventos. Erro:{ex.Message}");
            }
        }

        [HttpGet("idEvento/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
             try
            {
                var evento = await _eventosService.GetAllEventosByIdAsync(id, true);
                if (evento == null) return NotFound("Nenhum evento foi encontrado.");

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar evento. Erro:{ex.Message}");
            }
        }
        
        [HttpGet("tema/{tema}")]
        public async Task<IActionResult> GetByTema(string tema)
        {
             try
            {
                var evento = await _eventosService.GetAllEventosByTemaAsync(tema, true);
                if (evento == null) return NotFound($"Não foi encontrado nenhum evento com esse tema: {tema}");

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar evento. Erro:{ex.Message}");
            }
        }

        [HttpPost("adicionarEvento")]
         public async Task<IActionResult> Post(Evento model)
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
         public async Task<IActionResult> Put(int idEvento, Evento model)
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
                return await _eventosService.DeleteEventos(idEvento) ?
                    Ok("Evento excluido com sucesso.") : BadRequest("Não foi encontrado o evento a ser excluido.");

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
