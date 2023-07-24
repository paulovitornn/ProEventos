using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
    public class EventoService : IEventosService
    {
        private readonly IGeralPersistence geralPersist;
        private readonly IEventosPersistence eventoPersist;
        private readonly IMapper mapper;

        public EventoService(IGeralPersistence geralPersist, 
                             IEventosPersistence eventoPersist,
                             IMapper mapper)
        {
            this.eventoPersist = eventoPersist;
            this.mapper = mapper;
            this.geralPersist = geralPersist;
            
        }
        public async Task<EventoDto> AddEventos(EventoDto model)
        {
            try
            {
                var evento = this.mapper.Map<Evento>(model);

                this.geralPersist.Add<Evento>(evento);
                if (await this.geralPersist.SaveChangesAsync())
                {
                    var eventoRetorno = await this.eventoPersist.GetEventosByIdAsync(evento.Id, false);
                    
                    return this.mapper.Map<EventoDto>(eventoRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<EventoDto> UpdateEventos(int eventoId, EventoDto modelDto)
        {
            try
            {
                var evento = await this.eventoPersist.GetEventosByIdAsync(eventoId, false);
                if (evento == null) return(null);

                modelDto.Id = evento.Id;

                var model = this.mapper.Map<Evento>(modelDto);

                this.mapper.Map(modelDto, evento); // outra forma de fazer o mapeamento de um objeto no outro
                                                   // desta maneira os dados do primeiro objeto são replicados
                                                   // no segundo objeto de forma mapeada entres os tipos de objeto
                
                this.geralPersist.Update<Evento>(evento);
                if (await this.geralPersist.SaveChangesAsync())
                {
                    var EventoRetorno = await this.eventoPersist.GetEventosByIdAsync(evento.Id, false);
                    return this.mapper.Map<EventoDto>(EventoRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<bool> DeleteEventos(int eventoId)
        {
            try
            {
                var evento = await this.eventoPersist.GetEventosByIdAsync(eventoId, false);
                if (evento == null) throw new Exception("O evento para delete, não foi encontrado.");

                var resultado = this.mapper.Map<EventoDto>(evento);
                this.geralPersist.Delete<EventoDto>(resultado);
                return await this.geralPersist.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            try
            {
                 var eventos = await this.eventoPersist.GetAllEventosAsync(false);
                 if (eventos == null) return null;

                 var resultado = this.mapper.Map<EventoDto[]>(eventos);

                 return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
        {
             try
            {
                 var eventos = await this.eventoPersist.GetAllEventosByTemaAsync(tema, false);
                 if (eventos == null) return null;

                 var resultado = this.mapper.Map<EventoDto[]>(eventos);

                 return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<EventoDto> GetAllEventosByIdAsync(int eventoId, bool includePalestrantes = false)
        {
             try
            {
                 var evento = await this.eventoPersist.GetEventosByIdAsync(eventoId, false);
                 if (evento == null) return null;
                 
                 var resultado = this.mapper.Map<EventoDto>(evento);

                 return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        
    }
}