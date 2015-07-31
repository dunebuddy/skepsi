using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Skepsi.Api.Models
{
    public class Pensamento
    {
        public int Id { get; set; }
        public DateTime CriadoEm { get; set; }
        public string DescricaoPensamento { get; set; }
    }
}