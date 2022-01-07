using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;
using ProEventos.Application.Contratos;

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

        //public DataContext Context => _context;

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            //return _eventosService.Eventos;
        }

        [HttpGet("{id}")]
        public Evento GetById(int id)
        {
            return _context.Eventos.FirstOrDefault(
                evento => evento.Id == id);
        }
    }
}
