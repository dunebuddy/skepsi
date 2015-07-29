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
        PensamentoCtx _ctx;

        public PensamentosController(PensamentoCtx ctx)
        {
            _ctx = ctx;
        }
        [HttpGet]
        public IHttpActionResult Lista()
        {
            var pensamentos = _ctx.Pensamentos.ToList<Pensamento>();
            return Ok(pensamentos);
        }

        [HttpGet]
        public IHttpActionResult Dia()
        {
            var pensamento = _ctx.Pensamentos.First<Pensamento>();
            return Ok(pensamento);
        }
       
    }
}
