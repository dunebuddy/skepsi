using Skepsi.Api.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace Skepsi.Api.EntityTypeConfigurations
{
    public class PensamentoDoDiaEntityTypeConfiguration : EntityTypeConfiguration<PensamentoDoDia>
    {
        public PensamentoDoDiaEntityTypeConfiguration()
        {
            ToTable("PensamentosDoDia");

            HasKey(n => n.Id).Property(n => n.Id).HasColumnName("Id").HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            
            Property(n => n.Data).HasColumnName("Data");

            Property(n => n.PensamentoId).HasColumnName("PensamentoId");
            HasRequired(n => n.Pensamento).WithMany().HasForeignKey(n => n.PensamentoId).WillCascadeOnDelete(false);
        }
    }
}