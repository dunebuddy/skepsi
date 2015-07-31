using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Skepsi.Api.Models;
using Skepsi.Api.EntityTypeConfigurations;
using Skepsi.Api.Migrations;

namespace Skepsi.Api
{
    public class PensamentoDbContext : DbContext
    {
        public PensamentoDbContext() : base("Name=PensamentosDb")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<PensamentoDbContext, Configuration>());

            Database.Initialize(false);
        }

        public DbSet<Pensamento> Pensamentos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new PensamentoEntityTypeConfiguration());
            modelBuilder.Configurations.Add(new PensamentoDoDiaEntityTypeConfiguration());
        }
    }
}