using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Application.Contratos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
    public class EventoService : IEventosService
    {
        private readonly IGeralPersistence geralPersist;
        private readonly IEventosPersistence eventoPersist;
        public EventoService(IGeralPersistence geralPersist, IEventosPersistence eventoPersist)
        {
            this.eventoPersist = eventoPersist;
            this.geralPersist = geralPersist;
            
        }
        public async Task<Evento> AddEventos(Evento model)
        {
            try
            {
                this.geralPersist.Add<Evento>(model);
                if (await this.geralPersist.SaveChangesAsync())
                {
                    return await this.eventoPersist.GetEventosByIdAsync(model.Id, false);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<Evento> UpdateEventos(int eventoId, Evento model)
        {
            try
            {
                var evento = await this.eventoPersist.GetEventosByIdAsync(eventoId, false);
                if (evento == null) return(null);

                model.Id = evento.Id;
                
                this.geralPersist.Update(model);
                if (await this.geralPersist.SaveChangesAsync())
                {
                    return await this.eventoPersist.GetEventosByIdAsync(model.Id, false);
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
                
                this.geralPersist.Delete<Evento>(evento);
                return await this.geralPersist.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            try
            {
                 var eventos = await this.eventoPersist.GetAllEventosAsync(false);
                 if (eventos == null) return null;

                 return eventos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
        {
             try
            {
                 var eventos = await this.eventoPersist.GetAllEventosByTemaAsync(tema, false);
                 if (eventos == null) return null;

                 return eventos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<Evento> GetAllEventosByIdAsync(int eventoId, bool includePalestrantes = false)
        {
             try
            {
                 var eventos = await this.eventoPersist.GetEventosByIdAsync(eventoId, false);
                 if (eventos == null) return null;

                 return eventos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        
    }
}