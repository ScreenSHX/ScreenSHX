namespace ScreenSHX
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.panel1 = new System.Windows.Forms.Panel();
            this.boxInfo = new System.Windows.Forms.Label();
            this.boxStatus = new System.Windows.Forms.Label();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.DodgerBlue;
            this.panel1.Controls.Add(this.boxStatus);
            this.panel1.Controls.Add(this.boxInfo);
            this.panel1.Location = new System.Drawing.Point(-11, 532);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1281, 150);
            this.panel1.TabIndex = 0;
            // 
            // boxInfo
            // 
            this.boxInfo.BackColor = System.Drawing.Color.Transparent;
            this.boxInfo.Dock = System.Windows.Forms.DockStyle.Top;
            this.boxInfo.Font = new System.Drawing.Font("Microsoft Sans Serif", 30F);
            this.boxInfo.ForeColor = System.Drawing.Color.White;
            this.boxInfo.Location = new System.Drawing.Point(0, 0);
            this.boxInfo.Name = "boxInfo";
            this.boxInfo.Size = new System.Drawing.Size(1281, 93);
            this.boxInfo.TabIndex = 0;
            this.boxInfo.Text = "Parsing Information";
            this.boxInfo.TextAlign = System.Drawing.ContentAlignment.BottomCenter;
            this.boxInfo.UseMnemonic = false;
            // 
            // boxStatus
            // 
            this.boxStatus.BackColor = System.Drawing.Color.Transparent;
            this.boxStatus.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.boxStatus.Font = new System.Drawing.Font("Microsoft Sans Serif", 15F);
            this.boxStatus.ForeColor = System.Drawing.Color.White;
            this.boxStatus.Location = new System.Drawing.Point(0, 93);
            this.boxStatus.Name = "boxStatus";
            this.boxStatus.Size = new System.Drawing.Size(1281, 57);
            this.boxStatus.TabIndex = 1;
            this.boxStatus.Text = "Status";
            this.boxStatus.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.boxStatus.Click += new System.EventHandler(this.boxStatus_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.MenuHighlight;
            this.ClientSize = new System.Drawing.Size(1264, 681);
            this.Controls.Add(this.panel1);
            this.Name = "Form1";
            this.Text = "Form1";
            this.panel1.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Label boxInfo;
        private System.Windows.Forms.Label boxStatus;
    }
}

