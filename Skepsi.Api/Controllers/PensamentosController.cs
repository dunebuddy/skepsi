using Skepsi.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Skepsi.Api.Controllers
{
    [EnableCors("*","*","*")]
    public class PensamentosController : ApiController
    {
        PensamentoDbContext _context;

        public PensamentosController(PensamentoDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IHttpActionResult Lista()
        {
            var pensamentos = _context.Pensamentos.ToList<Pensamento>();
            return Ok(pensamentos);
        }

        [HttpGet]
        public IHttpActionResult Dia()
        {
            var pensamento = _context.Pensamentos.First<Pensamento>();
            return Ok(pensamento);
        }
       
    }
}
