using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Skepsi.Api.Models;
using Skepsi.Api.Mappings;

namespace Skepsi.Api
{
    public class PensamentoCtx : DbContext
    {
        public PensamentoCtx() : base("Name=PensamentosDb")
        {

        }

        public DbSet<Pensamento> Pensamentos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new PensamentoMap());
        }
    }
}