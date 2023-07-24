using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set;}
        public string Local { get; set;}
        public DateTime? DataEvento { get; set;}
        
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "O campo {0} exige um minimo de 3 e máximo de 50 caracteres.")]
        public string Tema { get; set;}
        
        [Required]
        [Range(20,1000, ErrorMessage = "{0} não pode ser menor que 20, nem maior que 1000.")]
        [Display(Name = "Quantidade de pessoas")]
        public int QtdPessoas { get; set;}

        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$",
                            ErrorMessage = "Não é uma imagem válida. (gif, jpg, jpeg, bmp ou png)")]
        public string ImagemURL { get; set;}

        [Phone(ErrorMessage = "{0} está inválido.")]
        [Required(ErrorMessage = "{0} está inválido.")]
        public string Telefone { get; set; }
        [Display(Name = "e-mail")]
        [EmailAddress(ErrorMessage = "{0} é um campo obrigatório.")]
        public string Email { get; set; }
        
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais{ get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}