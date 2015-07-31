using Skepsi.Api.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace Skepsi.Api.EntityTypeConfigurations
{
    public class PensamentoEntityTypeConfiguration : EntityTypeConfiguration<Pensamento>
    {
        public PensamentoEntityTypeConfiguration()
        {
            this.ToTable("Pensamento");

            HasKey(n => n.Id).Property(n => n.Id).HasColumnName("Id").HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(n => n.CriadoEm).HasColumnName("CriadoEm");
            Property(n => n.DescricaoPensamento).HasColumnName("DescricaoPensamento");
        }
    }
}