using Skepsi.Api.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace Skepsi.Api.Mappings
{
    public class PensamentoMap : EntityTypeConfiguration<Pensamento>
    {
        public PensamentoMap()
        {
            this.ToTable("Pensamento");

        }
    }
}