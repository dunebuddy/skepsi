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
    [EnableCorsAttribute("*","*","*")]
    public class PensamentosController : ApiController
    {
        // Preparar para EF
        // GET api/<controller>
        public IHttpActionResult Get()
        {
            List<Pensamento> pensamentos = new List<Pensamento>() 
            {
                new Pensamento {Id=1, CriadoEm=new DateTime(2015,7,20), DescricaoPensamento="Open source rocks"},
                new Pensamento {Id=2, CriadoEm=new DateTime(2015,7,21), DescricaoPensamento="O Visual Studio é a melhor IDE"}
            };
            return Ok(pensamentos);
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}