using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Skepsi.Api.Models
{
    public class PensamentoDoDia
    {
        public int Id { get; set; }
        public DateTime Data { get; set; }
        public int PensamentoId { get; set; }
        public Pensamento Pensamento { get; set; }
    }
}