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
        PensamentoCtx ctx = new PensamentoCtx();

        public IHttpActionResult Get()
        {
            var pensamentos = ctx.Pensamentos.ToList<Pensamento>();
            return Ok(pensamentos);
        }

       
    }
}
